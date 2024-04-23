async function fetchFraudData() {
    const search1 = encodeURIComponent(document.getElementById('search1').value);
    const search2 = encodeURIComponent(document.getElementById('search2').value);
    const search3 = encodeURIComponent(document.getElementById('search3').value);

    const serviceKey = encodeURIComponent('1Oo0omv4bVoztr5VGKOWz2QJYFpy2gmu8Kq8DbYg%2F%2B7gX2EfMQBU2jTu6MpQfsbJoqxzTTyyyDdSfpVZ0FIPlA%3D%3D');
    const url = `http://apis.data.go.kr/B410001/cmmrcFraudCase/cmmrcFraudCase?ServiceKey=${serviceKey}&type=json&numOfRows=10&pageNo=1&search1=${search1}&search2=${search2}&search3=${search3}&_type=json`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('results').innerHTML = '데이터를 불러오는 중 오류가 발생했습니다.';
    }
}

function displayResults(data) {
    const results = document.getElementById('results');
    results.innerHTML = ''; // 결과 영역 초기화

    if (data && data.response && data.response.body && data.response.body.itemList && data.response.body.itemList.item) {
        data.response.body.itemList.item.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${item.titl}</h3>
                <p>국가: ${item.natn}</p>
                <p>지역: ${item.regn}</p>
                <p>사기 유형: ${item.fraudType}</p>
                <p>게시 일자: ${item.othbcDt}</p>
                <p>내용: ${item.bdtCntnt}</p>
            `;
            results.appendChild(div);
        });
    } else {
        results.innerHTML = '검색 결과가 없습니다.';
    }
}