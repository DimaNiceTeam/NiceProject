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
    fetch('/path/to/STAT_STATIC.csv')
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

    if (!found) {
        const p = document.createElement('p');
        p.textContent = 'No data found for selected country';
        dataDiv.appendChild(p);
    }

    return dataDiv.outerHTML;
}

// 데이터 추출
function extractData(rowData, headers, prefix) {
    return headers.reduce((acc, header, index) => {
        if (header.startsWith(prefix)) {
            acc.push(parseFloat(rowData[index].replace(/,/g, '')) || 0);
        }
        return acc;
    }, []);
}

function createChart(data) {
    am5.ready(function() {

        // 차트 생성
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("insertChart");
    
    
        // 차트 테마 설정
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
    
        // 데이터 설정
        // 각 국가에 맞는 데이터들을 꽂아넣기
        var data = [
        {date: new Date(2019, 5, 3).getTime(), value: 50000}
        , {date: new Date(2020, 5, 3).getTime(), value: 52000}
        , {date: new Date(2021, 5, 3).getTime(), value: 48000}
        , {date: new Date(2022, 5, 3).getTime(), value: 47000}
        , {date: new Date(2023, 5, 3).getTime(), value: 76999, bullet: true}
        ]
    
        // 만약 가장 최근값이 null이라면 직전 값에 bullet(빨강 강조표시)값을 추가
        for (let i = 1; i < data.length; i++) {
            if (data[i].value === null) {
                data[i - 1].bullet = true;
            }
        }
    
        // xy차트 생성
        // 2차원 차트를 생성하여 스크롤 및 줌 기능 활성화
        // 이동 기능과 줌 기능은 필요없으므로 제거함!
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            //panY: true,
            //wheelX: "panX",
            //wheelY: "zoomX",
            //pinchZoomX:true,
            paddingLeft: 0
        }));
    
        chart.get("colors").set("step", 3);
    
    
    
        // 커서 추가
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
    
    
        // X축 값매기기
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.3,
            baseInterval: {
            timeUnit: "year",
            count: 1
        },
            renderer: am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 30
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));
    
        // 데이터 내에서 최대값 찾기(자동 크기조정 목적)
        var maxValue = Math.max(...data.map(item => item.value));
        var minValue = Math.min(...data.map(item => item.value));
    
        // y축에 값매기기
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {}),
            min: minValue - (minValue * 0.2),   // 최소 값 설정 - 최소 데이터 크기보다 20% 더 작게
            max: maxValue + (maxValue * 0.2),   // 최대 값 설정 - 최대 데이터 크기보다 20% 더 크게
            strictMinMax: true,                 // min과 max의 값을 한 번 더 강조
            extraMin: 0,                        // 축의 아래쪽 여유 공간 비율 설정 (필요하다면)
            //extraMax: 0.1                       // 축의 위쪽 여유 공간을 10%로 설정 (필요하다면)
        }));
            // 축의 간격(step) 설정
        yAxis.get("renderer").grid.template.setAll({
            location: 0
        });
        yAxis.get("renderer").labels.template.setAll({
            location: 0
        });
        yAxis.set("step", 10000);  // 10,000 단위로 눈금 설정
    
    
        // 시리즈 객체 생성
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
            })
        }));
        series.strokes.template.setAll({
            strokeWidth: 2,
            strokeDasharray: [3, 3]
        });
    
        // 제일 최신 데이터에 강조 표시 생성
        series.bullets.push(function(root, series, dataItem) {  
        if (dataItem.dataContext.bullet) {
            var container = am5.Container.new(root, {});
            var circle0 = container.children.push(am5.Circle.new(root, {
                radius: 5,
                fill: am5.color(0xff0000)
            }));
    
            var circle1 = container.children.push(am5.Circle.new(root, {
                radius: 5,
                fill: am5.color(0xff0000)
            }));
    
            circle1.animate({
                key: "radius",
                to: 20,
                duration: 1000,
                easing: am5.ease.out(am5.ease.cubic),
                loops: Infinity
            });
            circle1.animate({
                key: "opacity",
                to: 0,
                from: 1,
                duration: 1000,
                easing: am5.ease.out(am5.ease.cubic),
                loops: Infinity
            });
    
            return am5.Bullet.new(root, {
                sprite: container
                })
            }
        });
    
        series.data.setAll(data);
    
    
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    
    }); // end am5.ready()
}

// 이벤트 리스너 연결
function attachEventListeners() {
    document.getElementById('expBtn').addEventListener('click', () => displayData('EXP'));
    document.getElementById('impBtn').addEventListener('click', () => displayData('IMP'));
    document.getElementById('balBtn').addEventListener('click', () => displayData('BAL'));
    document.getElementById('gwtBtn').addEventListener('click', () => displayData('GWT'));
    document.getElementById('gdpBtn').addEventListener('click', () => displayData('GDP'));
}

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



// amCharts 라이브러리를 사용하여 차트 생성
function initializeChart() {
    am5.ready(function() {
        // 차트의 루트 요소 생성
        var root = am5.Root.new("chartdiv");

        // 차트 테마 설정
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // XY 차트 생성
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            wheelX: "panX",
            wheelY: "zoomX"
        }));

        // X축 생성 (연도)
        var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            baseInterval: { timeUnit: "year", count: 1 },
            renderer: am5xy.AxisRendererX.new(root, {})
        }));

        // Y축 생성 (값)
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        // 시리즈 생성
        var series = chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date"
        }));

        series.bullets.push(function() {
            return am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 5,
                    fill: am5.color(0xff0000)
                })
            });
        });

        // 차트를 전역 변수에 저장
        chartInstance = chart;
    });
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

// 데이터 형식 변환 함수
function formatChartData(values) {
    const years = [2019, 2020, 2021, 2022, 2023];  // 가정: 데이터가 이 연도들에 해당
    return values.map((value, index) => ({
        date: new Date(years[index], 0, 1).getTime(),
        value: value
    }));
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
    initializeChart();
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