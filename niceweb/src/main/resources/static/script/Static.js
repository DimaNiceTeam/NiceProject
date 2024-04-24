
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
var data = [{
    date: new Date(2019, 5, 3).getTime(),
    value: 20000
}, {
    date: new Date(2020, 5, 3).getTime(),
    value: 30000
}, {
    date: new Date(2021, 5, 3).getTime(),
    value: -28000
}, {
    date: new Date(2022, 5, 3).getTime(),
    value: 9000
}, {
    date: new Date(2023, 5, 3).getTime(),
    value: 29000,
    bullet: true
}]



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
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {}),
    min: Math.min(minValue * 1.2, minValue - 10000),   // 최소 값 설정 - 최소 데이터 크기보다 20% 더 작게
    max: Math.max(maxValue * 1.2, maxValue + 10000),   // 최대 값 설정 - 최대 데이터 크기보다 20% 더 크게
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