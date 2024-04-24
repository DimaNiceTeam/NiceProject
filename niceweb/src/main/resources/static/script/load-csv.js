document.addEventListener("DOMContentLoaded", function() {
    const csvRoot = document.getElementById('csv-root');

    // 파일 목록 정의
    const files = ['STAT_INFO.csv', 'STAT_STATIC.csv', 'STAT_REG.csv'];

    // 각 파일에 대해 처리
    files.forEach(file => {
        fetch(`/file/${file}`)
            .then(response => response.text())
            .then(data => {
                const table = csvToTable(data);
                // 테이블을 페이지에 추가 (기존 내용 뒤에)
                csvRoot.innerHTML += table;
            })
            .catch(error => console.error(`Error loading the CSV file ${file}:`, error));
    });
});

function csvToTable(csvString) {
    const rows = csvString.split('\n').map(row => row.split(','));
    const table = document.createElement('table');
    table.setAttribute('border', '1');

    rows.forEach((row, index) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement(index === 0 ? 'th' : 'td');
            td.textContent = cell.trim();
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    return table.outerHTML;
}