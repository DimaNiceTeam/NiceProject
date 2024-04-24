// csv 불러오기!!
document.addEventListener("DOMContentLoaded", function() {
    const csvRoot = document.getElementById('countryDetails');
    // 파일 목록 정의
    const files = ['STAT_INFO.csv', 'STAT_STATIC.csv', 'STAT_REG.csv'];

    // 각 파일에 대해 처리
    files.forEach(file => {
        fetch(`/file/${file}`)
            .then(response => response.text())
            .then(data => {
                const parsedData = parseCSV(data);
                if (file === 'STAT_INFO.csv') {
                    const contentDiv = createDataDiv(parsedData);
                    csvRoot.innerHTML += contentDiv;
                } else if (file === 'STAT_STATIC.csv') {
                    fetchDataForCountry(countrySelect);  // 업데이트된 함수를 호출
                } else if (file === 'STAT_REG.csv') {
                    const table = csvToTable(parsedData);
                    csvRoot.innerHTML += table;
                }
            })
            .catch(error => console.error(`Error loading the CSV file ${file}:`, error));
    });

    attachEventListeners();  // 이벤트 리스너 추가
});

// CSV 파싱 함수
function parseCSV(csvString) {
    const rows = csvString.split('\n');
    return rows.map(row => {
        let inQuotes = false;
        let modifiedRow = '';
        for (let char of row) {
            if (char === '"') {
                inQuotes = !inQuotes;
            }
            if (char === ',' && inQuotes) {
                modifiedRow += '|'; // 일시적인 대체 문자
            } else {
                modifiedRow += char;
            }
        }
        return modifiedRow.split(',').map(value => value.replace(/\|/g, ','));
    });
}

// 데이터 행 찾기 및 전역 변수 업데이트
function fetchDataForCountry(countryCode) {
    fetch('/file/STAT_STATIC.csv')
        .then(response => response.text())
        .then(data => {
            const parsedData = parseCSV(data);
            const valueRow = parsedData.find(row => row[0].trim().replace(/"/g, '') === countryCode);
            if (valueRow) {
                updateGlobalVariables(valueRow, parsedData[0]);  // 헤더 정보와 함께 전달
            } else {
                console.log("No data found for country:", countryCode);
            }
        })
        .catch(error => console.error("Error loading the CSV file:", error));
}

// 전역 변수 업데이트
function updateGlobalVariables(rowData, headers) {
    EXP = extractData(rowData, headers, 'EXP_');
    IMP = extractData(rowData, headers, 'IMP_');
    BAL = extractData(rowData, headers, 'BAL_');
    GWT = extractData(rowData, headers, 'GWT_');
    GDP = extractData(rowData, headers, 'GDP_');
}


// STAT_INFO의 데이터를 받아서 HTML에 뿌려주는 함수
function createDataDiv(csvData) {
    const dataDiv = document.createElement('div');
    let headers = csvData[0];
    let found = false;

    csvData.forEach((row, index) => {
        if (index !== 0 && row[0].trim().replace(/"/g, '') === countrySelect) {
            row.forEach((cell, cellIndex) => {
                const p = document.createElement('p');
                p.textContent = `${headers[cellIndex].trim().replace(/"/g, '')}: ${cell.trim().replace(/"/g, '')}`;
                dataDiv.appendChild(p);
            });
            found = true;
        }
    });
    
    // 찾지 못할 경우 못찾겠다꾀꼬리
    if (!found) {
        const p = document.createElement('p');
        p.textContent = 'No data found for selected country';
        dataDiv.appendChild(p);
    }

    return dataDiv.outerHTML;
}


// STAT_STATIC에서 데이터 추출
function extractData(rowData, headers, prefix) {
    return headers.reduce((acc, header, index) => {
        if (header.startsWith(prefix)) {
            // 데이터가 존재하면 쉼표를 제거하고 숫자로 변환, 없으면 0을 반환
            const data = rowData[index];
            const value = data ? parseFloat(data.replace(/,/g, '')) : 0;
            acc.push(value);
        }
        return acc;
    }, []);
}

// amCharts 라이브러리를 사용하여 차트 생성 및 업데이트
// 전역 변수로 차트의 Root 객체와 인스턴스를 저장
var chartRoot;
var chartInstance;

// 차트 초기화 또는 업데이트 함수
function initializeOrUpdateChart() {
    // am5.ready는 amCharts 로드 완료를 보장
    am5.ready(function() {
        // Root 객체가 없으면 새로 생성
        if (!chartRoot) {
            chartRoot = am5.Root.new("insertChart");
            
            // 차트 테마 설정
            chartRoot.setThemes([
                am5themes_Animated.new(chartRoot)
            ]);

            // XY 차트 생성
            var chart = chartRoot.container.children.push(am5xy.XYChart.new(chartRoot, {
                panX: true,
                wheelX: "panX",
                wheelY: "zoomX"
            }));

            // 차트 구성 요소 생성 (축, 시리즈 등)
            // X축과 Y축 추가
            var xAxis = chart.xAxes.push(am5xy.DateAxis.new(chartRoot, {
                baseInterval: { timeUnit: "year", count: 1 },
                renderer: am5xy.AxisRendererX.new(chartRoot, {})
            }));
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(chartRoot, {
                renderer: am5xy.AxisRendererY.new(chartRoot, {})
            }));

            // 시리즈 추가
            var series = chart.series.push(am5xy.LineSeries.new(chartRoot, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date"
            }));

            // 차트 인스턴스 저장
            chartInstance = chart;
        } else {
            // 차트가 이미 있으면 업데이트만 수행
            updateChartData();
        }
    });
}

// 데이터 업데이트 함수
function updateChartData(dataType) {
    let data = [];
    // dataType에 따라 전역 변수에서 데이터를 가져옴
    switch (dataType) {
        case 'EXP':
            data = formatChartData(EXP);
            break;
        case 'IMP':
            data = formatChartData(IMP);
            break;
        case 'BAL':
            data = formatChartData(BAL);
            break;
        case 'GWT':
            data = formatChartData(GWT);
            break;
        case 'GDP':
            data = formatChartData(GDP);
            break;
    }

    // 차트 데이터 설정
    if (chartInstance) {
        var series = chartInstance.series.getIndex(0);
        series.data.setAll(data);
    }
}

// 데이터 형식 변환 함수
function formatChartData(values) {
    const years = [2019, 2020, 2021, 2022, 2023];  // 가정: 데이터가 이 연도들에 해당
    return values.map((value, index) => ({
        date: new Date(years[index], 0, 1).getTime(),
        value: value
    }));
}

// 이벤트 리스너 연결
document.querySelectorAll('.statBtn').forEach(btn => {
    btn.addEventListener('click', function() {
        const dataType = this.getAttribute('data-type');  // 각 버튼에 data-type 속성을 미리 설정해두어야 함
        updateChartData(dataType);
    });
});

// 데이터 표시
function displayData(type) {
    let data;
    switch (type) {
        case 'EXP':
            data = EXP;
            break;
        case 'IMP':
            data = IMP;
            break;
        case 'BAL':
            data = BAL;
            break;
        case 'GWT':
            data = GWT;
            break;
        case 'GDP':
            data = GDP;
            break;
        default:
            return;
    }
    //console.log(type + " data:", data); // Example to show data
}



// 차트 데이터 업데이트 함수
function updateChartData(dataType) {
    let data = [];
    switch (dataType) {
        case 'EXP':
            data = formatChartData(EXP);
            break;
        case 'IMP':
            data = formatChartData(IMP);
            break;
        case 'BAL':
            data = formatChartData(BAL);
            break;
        case 'GWT':
            data = formatChartData(GWT);
            break;
        case 'GDP':
            data = formatChartData(GDP);
            break;
    }

    // 차트 데이터 설정
    if (chartInstance) {
        var series = chartInstance.series.getIndex(0);
        series.data.setAll(data);
    }
}


// 이벤트 리스너 연결
function attachEventListeners() {
    document.getElementById('expBtn').addEventListener('click', () => updateChartData('EXP'));
    document.getElementById('impBtn').addEventListener('click', () => updateChartData('IMP'));
    document.getElementById('balBtn').addEventListener('click', () => updateChartData('BAL'));
    document.getElementById('gwtBtn').addEventListener('click', () => updateChartData('GWT'));
    document.getElementById('gdpBtn').addEventListener('click', () => updateChartData('GDP'));
}

// 페이지 로드시 차트 초기화
document.addEventListener("DOMContentLoaded", function() {
    initializeOrUpdateChart();
    attachEventListeners();
});


// REGL 데이터를 테이블 형식으로 저장
function csvToTable(csvData) {
    const table = document.createElement('table');
    table.setAttribute('border', '1');

    // 첫 번째 행은 헤더라고 가정하고 모두 추가
    const headerRow = document.createElement('tr');
    csvData[0].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.trim().replace(/"/g, '');
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // 데이터 행 중 countrySelect 값과 일치하는 첫 번째 열의 값만 있는 행을 찾아 추가
    let found = false;
    csvData.slice(1).forEach(row => {
        if (row[0].trim().replace(/"/g, '') === countrySelect) {
            const dataRow = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell.trim().replace(/"/g, '');
                dataRow.appendChild(td);
            });
            table.appendChild(dataRow);
            found = true; // 일치하는 행을 찾았음
        }
    });

    if (!found) { // 일치하는 행을 찾지 못한 경우
        const noDataRow = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', csvData[0].length);
        td.textContent = 'No data found for selected country';
        noDataRow.appendChild(td);
        table.appendChild(noDataRow);
    }

    return table.outerHTML;
}


document.addEventListener("DOMContentLoaded", initializeOrUpdateChart);