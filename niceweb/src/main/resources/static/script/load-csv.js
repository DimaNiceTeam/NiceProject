// const countrySelect = "VN"; // 이 예제에서는 'VN'으로 고정

// document.addEventListener("DOMContentLoaded", function() {
//     const csvRoot = document.getElementById('csv-root');

//     // 파일 목록 정의
//     const files = ['STAT_INFO.csv', 'STAT_STATIC.csv', 'STAT_REG.csv'];

//     // 각 파일에 대해 처리
//     files.forEach(file => {
//         fetch(`/file/${file}`)
//             .then(response => response.text())
//             .then(data => {
//                 const parsedData = parseCSV(data);
//                 if (file === 'STAT_INFO.csv') {
//                     const contentDiv = createDataDiv(parsedData);
//                     csvRoot.innerHTML += contentDiv;
//                 } else if (file === 'STAT_STATIC.csv') {
//                     const chartData = extractChartData(parsedData);
//                     createChart(chartData);
//                 } else if (file === 'STAT_REG.csv') {
//                     const table = csvToTable(parsedData);
//                     csvRoot.innerHTML += table;
//                 }
//             })
//             .catch(error => console.error(`Error loading the CSV file ${file}:`, error));
//     });
// });

// function parseCSV(csvString) {
//     const rows = csvString.split('\n');
//     return rows.map(row => {
//         let inQuotes = false;
//         let modifiedRow = '';
//         for (let char of row) {
//             if (char === '"') {
//                 inQuotes = !inQuotes;
//             }
//             if (char === ',' && inQuotes) {
//                 modifiedRow += '|'; // 일시적인 대체 문자
//             } else {
//                 modifiedRow += char;
//             }
//         }
//         return modifiedRow.split(',').map(value => value.replace(/\|/g, ','));
//     });
// }

// function createDataDiv(csvData) {
//     const dataDiv = document.createElement('div');
//     let headers = csvData[0];
//     let found = false;

//     csvData.forEach((row, index) => {
//         if (index !== 0 && row[0].trim().replace(/"/g, '') === countrySelect) {
//             row.forEach((cell, cellIndex) => {
//                 const p = document.createElement('p');
//                 p.textContent = `${headers[cellIndex].trim().replace(/"/g, '')}: ${cell.trim().replace(/"/g, '')}`;
//                 dataDiv.appendChild(p);
//             });
//             found = true;
//         }
//     });

//     if (!found) {
//         const p = document.createElement('p');
//         p.textContent = 'No data found for selected country';
//         dataDiv.appendChild(p);
//     }

//     return dataDiv.outerHTML;
// }

// function extractChartData(csvData) {
//     const chartData = [];
//     const headers = csvData[0];
//     const columns = ['EXP', 'IMP', 'BAL', 'GWT', 'GDP'];
//     let yearColumns = headers.filter(header => columns.some(col => header.includes(col)));
//     let valueRow = csvData.find(row => row[0].trim().replace(/"/g, '') === countrySelect);

//     if (valueRow) {
//         yearColumns.forEach((col, index) => {
//             let year = col.match(/\d+/)[0]; // Assume the year is in the column header
//             let value = parseFloat(valueRow[index + 1].replace(/,/g, '')); // Removing commas and converting to float
//             chartData.push({ date: new Date(year, 0, 1).getTime(), value: value });
//         });
//     }

//     return chartData;
// }

// function createChart(data) {
//     am5.ready(function() {
//         // Chart creation logic here
//         var root = am5.Root.new("insertChart");
//         // Set up and create the chart with `data`
//         console.log(data); // Use data to create the chart
//     });
// }

// function csvToTable(csvData) {
//     const table = document.createElement('table');
//     table.setAttribute('border', '1');
//     csvData.forEach((row, index) => {
//         const tr = document.createElement('tr');
//         row.forEach(cell => {
//             const td = document.createElement(index === 0 ? 'th' : 'td');
//             td.textContent = cell.trim().replace(/"/g, '');
//             tr.appendChild(td);
//         });
//         table.appendChild(tr);
//     });
//     return table.outerHTML;
// }