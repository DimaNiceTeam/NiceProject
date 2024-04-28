// // csv 불러오기!!
// document.addEventListener("DOMContentLoaded", function() {
//     const csvRoot = document.getElementById('insertReg');

//     fetch(`/file/STAT_REG.csv`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.text();
//     })
//     .then(data => {
//         const parsedData = parseCSV(data);
//         const table = csvToTable(parsedData);
//         csvRoot.innerHTML += table;
//     })
//     .catch(error => console.error(`Error loading the CSV file`, error));

//     attachEventListeners();  // 이벤트 리스너 추가
// });

// // CSV 파싱 함수
// function parseCSV(csvString) {
//     const rows = csvString.split('\n').filter(row => row.trim() !== '');
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
//         return modifiedRow.split(',').map(value => value.replace(/\|/g, ',').trim().replace(/"/g, ''));
//     });
// }


// // STAT_REG 데이터를 테이블 형식으로 저장
// function csvToTable(csvData) {
//     const table = document.createElement('table');
//     table.setAttribute('border', '1');

//     // 첫 번째 행은 헤더라고 가정하고 모두 추가
//     const headerRow = document.createElement('tr');
//     csvData[0].forEach(header => {
//         const th = document.createElement('th');
//         th.textContent = header.trim().replace(/"/g, '');
//         headerRow.appendChild(th);
//     });
//     table.appendChild(headerRow);

//     // 데이터 행 중 countrySelect 값과 일치하는 첫 번째 열의 값만 있는 행을 찾아 추가
//     let found = false;
//     csvData.slice(1).forEach(row => {
//         if (row[0].trim().replace(/"/g, '') === countrySelect) {
//             const dataRow = document.createElement('tr');
//             row.forEach(cell => {
//                 const td = document.createElement('td');
//                 td.textContent = cell.trim().replace(/"/g, '');
//                 dataRow.appendChild(td);
//             });
//             table.appendChild(dataRow);
//             found = true; // 일치하는 행을 찾았음
//         }
//     });

//     if (!found) { // 일치하는 행을 찾지 못한 경우
//         const noDataRow = document.createElement('tr');
//         const td = document.createElement('td');
//         td.setAttribute('colspan', csvData[0].length);
//         td.textContent = 'No data found for selected country';
//         noDataRow.appendChild(td);
//         table.appendChild(noDataRow);
//     }

//     return table.outerHTML;
// }