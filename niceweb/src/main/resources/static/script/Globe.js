 //국가 코드를 두 js파일에서 유기적으로 가져올 전역변수 설정
var countrySelect = '';

// HTML 내에서 선택된 국가 코드를 처리하는 함수
function selectCountry(countryCode) {   
    countrySelect = countryCode;  // 전역 변수 업데이트
    console.log(countrySelect);
    updateCountryInfo(countryCode);  // 국가 정보 업데이트 함수 호출
    fetchDataForCountry(countryCode);  // 데이터 가져오기 함수 호출
    updateCountryDetailsUI();  // UI 업데이트
}

am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    

    var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    }));

    var filter = root.interfaceColors.get("shadow");
    chart.set("filter", filter);
    

    var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color(0x6AE4),
        fillOpacity: 0.9,
        strokeOpacity: 0
    });
    backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });


    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
    }));

    polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        toggleKey: "active",
        interactive: true,
        fill: am5.color(0x33CC33),
        strokeWidth: 1
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0x009900) // Darker green when hovered
    });

    polygonSeries.mapPolygons.template.states.create("active", {
        fill: am5.color(0x006600) // Even darker green when clicked
    });


    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon

    var graticuleSeries = chart.series.unshift(
        am5map.GraticuleSeries.new(root, {
            step: 10
        })
    );

    graticuleSeries.mapLines.template.set("strokeOpacity", 0.1)

    // Set up events
    var previousPolygon;

    polygonSeries.mapPolygons.template.on("active", function (active, target) {
        if (previousPolygon && previousPolygon != target) {
            previousPolygon.set("active", false);
        }
        if (target.get("active")) {
            selectCountry(target.dataItem.get("id"));
        }
        previousPolygon = target;
    });

    const continentCountries = {
        "Asia": ["CN", "KR", "IN", "MY", "JP", "TH", "HK", "SG", "TW", "AE", "IL", "BH", "QA", "VN", "SA", "ID", "PH", "PK", "LK", "UZ"],
        "Europe": ["DE", "GB", "FR", "SE", "AT", "DK", "IT", "BE", "NL", "SI", "HU", "CH", "CZ", "RO", "TR", "RS", "PL", "UA", "SK", "FI", "BG", "EE", "GR", "NO", "PT", "LV", "HR", "GE", "BY", "LT", "MT", "BA", "ES"],
        "NorthAmerica": ["US", "CA", "MX", "GT", "CR", "SV", "JM", "NI", "DO", "VG", "PA"],
        "SouthAmerica": ["BR", "CO", "AR", "CL", "VE", "EC", "TT"],
        "Africa": ["ZA", "NG", "EG", "MA", "KE"],
        "Oceania": ["NZ", "AU"]
    };

    const countryNames = {
        "CN": "China", "KR": "South Korea", "IN": "India", "MY": "Malaysia", "JP": "Japan", "TH": "Thailand", "HK": "Hong Kong", "SG": "Singapore", "TW": "Taiwan",
        "AE": "United Arab Emirates", "IL": "Israel", "BH": "Bahrain", "QA": "Qatar", "VN": "Vietnam", "SA": "Saudi Arabia", "ID": "Indonesia", "PH": "Philippines", "PK": "Pakistan",
        "LK": "Sri Lanka", "UZ": "Uzbekistan", "DE": "Germany", "GB": "United Kingdom", "FR": "France", "SE": "Sweden", "AT": "Austria", "DK": "Denmark",
        "IT": "Italy", "BE": "Belgium", "NL": "Netherlands", "SI": "Slovenia", "HU": "Hungary", "CH": "Switzerland", "CZ": "Czech Republic", "RO": "Romania",
        "TR": "Turkey", "RS": "Serbia", "PL": "Poland", "UA": "Ukraine", "SK": "Slovakia", "FI": "Finland", "BG": "Bulgaria", "EE": "Estonia", "GR": "Greece",
        "NO": "Norway", "PT": "Portugal", "LV": "Latvia", "HR": "Croatia", "GE": "Georgia", "BY": "Belarus", "LT": "Lithuania", "MT": "Malta",
        "BA": "Bosnia and Herzegovina", "ES": "Spain", "US": "United States", "CA": "Canada", "MX": "Mexico", "GT": "Guatemala", "CR": "Costa Rica", "SV": "El Salvador",
        "JM": "Jamaica", "NI": "Nicaragua", "DO": "Dominican Republic", "VG": "British Virgin Islands", "PA": "Panama", "BR": "Brazil", "CO": "Colombia", "AR": "Argentina",
        "CL": "Chile", "VE": "Venezuela", "EC": "Ecuador", "TT": "Trinidad and Tobago", "ZA": "South Africa", "NG": "Nigeria", "EG": "Egypt", "MA": "Morocco", "KE": "Kenya",
        "NZ": "New Zealand", "AU": "Australia"
    };
    function getCountryName(code) {
        return countryNames[code] || code;  // 국가 코드에 해당하는 이름이 없다면 코드를 그대로 반환
    }

    function generateCountryList(continent) {
        var ul = document.createElement('ul');
        continentCountries[continent].forEach(function (countryCode) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = "#";
            a.textContent = getCountryName(countryCode);  // 국가 코드를 국가명으로 변환
            a.addEventListener('click', function (event) {
                event.preventDefault();
                selectCountry(countryCode);
            });
            li.appendChild(a);
            ul.appendChild(li);
        });
        return ul;
    }
    // 기존의 국가 코드 목록을 하나로 통합합니다.
    // 모든 국가 코드 목록을 하나로 통합합니다.
    var allContinentCountries = [].concat.apply([], Object.values(continentCountries));

    // geoJSON 데이터가 시리즈에 로드된 후에 각 국가 폴리곤에 대한 설정을 합니다.
    polygonSeries.events.on("datavalidated", function () {
        // 모든 데이터 항목들을 반복하면서 조건에 맞지 않는 국가들의 색상을 변경합니다.
        polygonSeries.mapPolygons.each(function (mapPolygon) {
            var countryId = mapPolygon.dataItem.dataContext.id;
            if (!allContinentCountries.includes(countryId)) {
                // continentCountries에 포함되지 않는 국가의 색상을 변경합니다.
                mapPolygon.set("fill", am5.color(0xAAAAAA)); // 색상 코드를 변경하세요.
            }
        });
    });
    polygonSeries.events.on("datavalidated", function () {
        polygonSeries.mapPolygons.each(function (mapPolygon) {
            var countryId = mapPolygon.dataItem.dataContext.id;
            if (!allContinentCountries.includes(countryId)) {
                // continentCountries에 포함되지 않는 국가의 색상을 변경합니다.
                mapPolygon.set("fill", am5.color(0xCCCCCC)); // 변경하고자 하는 색상 코드로 설정하세요.

                // 클릭을 비활성화합니다.
                mapPolygon.set("interactive", false);
            }
        });
    });

    function updateTooltip(target, dataItem) {
        var countryName = countryNames[dataItem.dataContext.id] || dataItem.dataContext.name;
        if (target.tooltip) {
            target.tooltip.text = countryName;
        } else {
            target.tooltip = am5.Tooltip.new(root, {
                text: countryName
            });
        }
        target.showTooltip();
    }

    function getCountryName(code) {
        return countryNames[code] || code;
    }

    var lastActiveTooltip = null; // Last active tooltip

    function selectCountry(id) {
        // 툴팁이 이미 활성화되어 있다면 숨깁니다.
        if (lastActiveTooltip) {
            lastActiveTooltip.hideTooltip();
        }

        // 선택된 국가의 데이터 항목을 가져옵니다.
        var dataItem = polygonSeries.getDataItemById(id);
        var target = dataItem.get("mapPolygon");

        // 대상 폴리곤이 존재한다면 실행합니다.
        if (target) {
            // 대상 국가의 지리적 중심으로 지도를 이동시킵니다.
            moveToCountry(target.geoCentroid().longitude, target.geoCentroid().latitude);

            // 국가 정보를 업데이트합니다.
            updateCountryInfo(id);

            // 대상 폴리곤의 툴팁을 업데이트하고 활성화 상태로 설정합니다.
            updateTooltip(target, dataItem);
            target.set("active", true);

            // 마지막으로 활성화된 툴팁을 업데이트합니다.
            lastActiveTooltip = target;

            // HTML에 저장한 전역변수 countrySelect 업데이트
            // 저장한 전역변수로 Static.js에 정의된 함수를 호출하여 상세 정보 업데이트
            countrySelect = id; // id는 국가 코드 (예: "US", "CN" 등)
            updateDetailsForCountry(countrySelect);
        }
    }

    function moveToCountry(longitude, latitude) {
        chart.animate({ key: "rotationX", to: -longitude, duration: 1500 });
        chart.animate({ key: "rotationY", to: -latitude, duration: 1500 });
    }

    function updateCountryInfo(countryCode) {
        var countryName = getCountryName(countryCode); // 국가 이름 가져오기
        var flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`; // 국기 이미지 URL 생성

        document.getElementById('countryFlag').src = flagUrl; // 이미지 소스 업데이트
        document.getElementById('countryFlag').alt = "Flag of " + countryName; // 대체 텍스트 설정
        document.getElementById('countryName').textContent = countryName; // 국가 이름 업데이트
        // 아래 코드가 들어갈 부분은 Static.js에서 가져오는 값으로 대체
        // document.getElementById('countryDetails').textContent = "Details about " + countryName; // 세부 정보 업데이트
        document.getElementById('countryInfo').style.display = 'block'; // 정보 박스 표시
        // 이미지 세로 길이 조정
        document.getElementById('countryFlag').style.height = '100px'; // 예시로 100px로 조정

        countrySelect = countryCode;  // Global variable update for the selected country
        console.log(countrySelect);
        fetch('/file/STAT_INFO.csv')  // Assuming the CSV file URL
            .then(response => response.text())
            .then(data => {
                const parsedData = parseCSV(data);
                document.getElementById('countryDetails').innerHTML = createDataDiv(parsedData);
                
            })
            .catch(error => console.error(`Error loading the CSV file:`, error));
        
        // STAT_STATIC.csv 파일을 가져와서 전역 변수를 업데이트합니다.
        fetchDataForCountry(countrySelect);
        

    }

        // 국가 상세 정보를 업데이트하는 UI 로직
    function updateCountryDetailsUI() {
        fetch(`/file/STAT_INFO.csv`)
            .then(response => response.text())
            .then(data => {
                const parsedData = parseCSV(data);
                const contentDiv = createDataDiv(parsedData);
                document.getElementById('countryDetails').innerHTML = contentDiv;
            })
            .catch(error => console.error(`Error loading the CSV file:`, error));
    }

    document.getElementById('countrySelect').addEventListener('change', function () {
        var selectedCountryId = this.value;
        selectCountry(selectedCountryId);
    });

    document.getElementById('continentSelect').addEventListener('change', function () {
        updateCountryList();
    });

    function updateCountryList() {
        var continent = document.getElementById("continentSelect").value;
        console.log(continent)
        var countrySelect = document.getElementById("countrySelect");
        console.log(countrySelect)
        countrySelect.innerHTML = '<option value="">Select Country</option>';
        if (continent) {
            continentCountries[continent].forEach(function (code) {
                var option = document.createElement("option");
                option.value = code;
                option.textContent = getCountryName(code);
                countrySelect.appendChild(option);
            });
        }
    }

    // 전역변수 countrySelect 업데이트 코드
    function updateDetailsForCountry(countryCode) {
        fetch(`/file/STAT_INFO.csv`)
            .then(response => response.text())
            .then(data => {
                const parsedData = parseCSV(data);
                const contentDiv = createDataDiv(parsedData, countryCode); // 수정된 countrySelect 값을 사용
                document.getElementById('countryDetails').innerHTML = contentDiv;
                updateChartData('EXP');
                updateChartData('IMP');
                updateChartData('BAL');
                updateChartData('GWT');
                updateChartData('GDP');
            })
            .catch(error => console.error(`Error loading the CSV file:`, error));
    }
});

