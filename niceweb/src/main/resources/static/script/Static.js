 // 이 js파일은 globeindex.html과 showReg.html에 연결됨
// 이 js파일은 Globe.js파일과 상호연결되어있음


var chartInstance;

// csv 불러오기!!
document.addEventListener("DOMContentLoaded", function () {
    const csvRoot = document.getElementById('countryDetails');
    //const insertChart = document.getElementById('insertChart');
    // 파일 목록 정의
    const files = ['STAT_INFO.csv', 'STAT_STATIC.csv'];

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
                    console.log("countrySelect: " + countrySelect);
                    fetchDataForCountry(countrySelect);  // 업데이트된 함수를 호출
                }
            })
            .catch(error => console.error(`Error loading the CSV file ${file}:`, error));
    });

    attachEventListeners();  // 이벤트 리스너 추가
});

// CSV 파싱 함수
function parseCSV(csvString) {
    const rows = csvString.split('\n').filter(row => row.trim() !== '');
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
        return modifiedRow.split(',').map(value => value.replace(/\|/g, ',').trim().replace(/"/g, ''));
    });
}



// STAT_INFO의 데이터를 받아서 HTML에 뿌려주는 함수
function createDataDiv(csvData) {
    const dataDiv = document.createElement('div');
    let headers = csvData[0];
    let found = false;

    // 아래 함수에 쓰일 컬럼네임:출력데이터 dictionary 생성

    const outputName = {
        'STAT_NTN': '국가명',
        'STAT_POP': '인구수',
        'STAT_CPT': '수도',
        'STAT_LAN': '언어'
    }

    csvData.forEach((row, index) => {
        if (index !== 0 && row[0].trim().replace(/"/g, '') === countrySelect) {
            row.forEach((cell, cellIndex) => {
                // 열값이 0보다 클 때 = 첫번째 열 제외 = STAT_ID값 미출력!
                if (cellIndex > 0) {
                    // header에 매핑된 값을 찾거나, 없으면 원래 header 값을 사용
                    const headerLabel = outputName[headers[cellIndex].trim().replace(/"/g, '')] || headers[cellIndex].trim().replace(/"/g, '');
                    const p = document.createElement('p');
                    p.textContent = `${headerLabel}: ${cell.trim().replace(/"/g, '')}`;
                    dataDiv.appendChild(p);
                }
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


// 차트의 각 내용을 담을 전역변수 설정
let EXP = [], IMP = [], BAL = [], GWT = [], GDP = [];
let data = [];

function updateGlobalVariables(rowData, headers) {
    // 각 변수에 대해 해당하는 열의 데이터를 추출합니다.
    EXP = extractData(rowData, headers, 'EXP_');
    IMP = extractData(rowData, headers, 'IMP_');
    BAL = extractData(rowData, headers, 'BAL_');
    GWT = extractData(rowData, headers, 'GWT_');
    GDP = extractData(rowData, headers, 'GDP_');
}


// STAT_STATIC에서 데이터 추출
function extractData(rowData, headers, prefix) {
    return headers.reduce((acc, header, index) => {
        if (header.startsWith(prefix)) {
            acc.push(parseFloat(rowData[index].replace(/,/g, '')) || 0);
        }
        return acc;
    }, []);
}
// amCharts 라이브러리를 사용하여 차트 생성 및 업데이트
// 전역 변수로 차트의 Root 객체와 인스턴스를 저장
var chartRoot;
// 차트 인스턴스를 저장할 변수
var chartInstance;

// 차트 초기화 또는 업데이트 함수
function initializeOrUpdateChart() {
    am5.ready(function () {
        // 차트가 이미 생성된 경우를 대비하여 확인
        if (!chartInstance) {
            var root = am5.Root.new("insertChart"); // "insertChart"는 차트를 삽입할 HTML 요소의 ID

            // 차트 테마 설정
            root.setThemes([am5themes_Animated.new(root)]);

            // 차트 생성
            var chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                paddingLeft: 0
            }));

            // x축 생성
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
            // var maxValue = Math.max(...data.map(item => item.value));
            // var minValue = Math.min(...data.map(item => item.value));

            // y축 생성
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,

                renderer: am5xy.AxisRendererY.new(root, {}),
                extraMin: 0.1,                      // 축의 아래쪽 여유 공간 비율 설정 (필요하다면)
                extraMax: 0.1                       // 축의 위쪽 여유 공간 비율 설정 (필요하다면)
            }));

            // 시리즈 생성
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

            // 데이터 null 처리 및 직전 값 강조
            for (let i = 1; i < data.length; i++) {
                if (data[i].value === null) {
                    data[i - 1].bullet = true;
                }
            }

            // 커서 추가
            var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            // 제일 최신 데이터에 강조 표시 생성
            series.bullets.push(function (root, series, dataItem) {
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
                    });
                }
            });

            chartInstance = chart; // 전역 변수에 차트 인스턴스 저장
        } else {
            console.log("Chart is already initialized.");
        }
    });
}





function attachEventListeners() {
    // 모든 통계 버튼에 대한 이벤트 리스너 연결
    document.querySelectorAll('.statBtn').forEach(btn => {
        btn.addEventListener('click', function () {
            const dataType = btn.getAttribute('data-type'); // 이 버튼의 data-type 속성 가져오기

            // 제대로 선택한 버튼이 눌리고, 해당 값을 가져오는지 확인하는 콘솔로그 출력
            //console.log("버튼 값: " + dataType)

            updateChartData(dataType);  // 차트 데이터 업데이트 함수 호출
        });
    });
}

// 데이터 표시
function displayData(type) {
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

    switch (dataType) {
        case 'EXP':
            data = [0, 0, 0, 0, 0];
            data = formatChartData(EXP);
            break;
        case 'IMP':
            data = [0, 0, 0, 0, 0];
            data = formatChartData(IMP);
            break;
        case 'BAL':
            data = [0, 0, 0, 0, 0];
            data = formatChartData(BAL);
            break;
        case 'GWT':
            data = [0, 0, 0, 0, 0];
            data = formatChartData(GWT);
            break;
        case 'GDP':
            data = [0, 0, 0, 0, 0];
            data = formatChartData(GDP);
            break;
        case 'REG':
            var newUrl = 'showReg?country=' + encodeURIComponent(countrySelect);
            window.open(newUrl, '_blank');
            break;
        default:
            console.error("Invalid data type");
            return;
    }

    // 데이터 확인용 콘솔출력
    //console.log("데이터" + data);
    //console.log("차트인스턴스" + chartInstance)

    // 차트 데이터 설정
    if (chartInstance) {
        var series = chartInstance.series.getIndex(0);
        series.data.setAll(data);
    } else {
        console.error("Chart instance not found");
    }
}

// 데이터 형식 변환 함수
function formatChartData(values) {
    const years = [2019, 2020, 2021, 2022, 2023];
    let results = []; // 최종 데이터를 저장할 배열

    for (let index = 0; index < values.length; index++) {
        let value = values[index];
        // 값이 0이면 null 처리
        let formattedValue = (value === 0 ? null : value);

        // 데이터 객체 생성
        let dataObject = {
            date: new Date(years[index], 0, 1).getTime(),
            value: formattedValue
        };

        results.push(dataObject); // 결과 배열에 추가
    }

    // 마지막 값을 검사하고 bullet 설정
    if (results.length > 0) {
        let lastIndex = results.length - 1;
        if (results[lastIndex].value === null) {
            // 마지막 값이 null이라면, 마지막 유효 값 찾기
            for (let i = lastIndex - 1; i >= 0; i--) {
                if (results[i].value !== null) {
                    results[i].bullet = true;
                    break; // 유효 값에 bullet 설정 후 반복 종료
                }
            }
        } else {
            // 마지막 값이 유효하다면 그 값에 bullet 설정
            results[lastIndex].bullet = true;
        }
    }


    return results;
}

// 차트 까꿍
function ggaggung() {
    document.getElementById('insertChart').style.display = 'block';
}
// 버튼 클릭시 차트 보이게 하기
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.statBtn').forEach(btn => {
        btn.addEventListener('click', ggaggung);
    });
});

// statBtn들 관리
document.addEventListener("DOMContentLoaded", function () {
    var statBtn = document.querySelector('.statBtn');  // 'statBtn' 클래스를 가진 div 선택
    if (statBtn) {
        statBtn.addEventListener('click', function () {
            initializeOrUpdateChart();  // 차트 초기화 또는 업데이트
            attachEventListeners();     // 이벤트 리스너 연결
        });
    }
});

// statBtn 초기화 함수  <-- Globe.js에서 사용함!
function resetStatButtonStyles() {
    document.querySelectorAll('.statBtn').forEach(btn => {
        btn.style.borderBottom = '4px solid navy'; // 초기 borderBottom 스타일
        btn.style.height = '50px'; // 초기 height 스타일
        btn.style.transform = '';
        btn.style.background = ''; // 초기 background 스타일 (지정되어 있지 않은 경우)
        btn.style.color = ''; // 초기 color 스타일 (지정되어 있지 않은 경우)
        btn.style.transform = ''; // 초기 transform 스타일 (지정되어 있지 않은 경우)
    });
}