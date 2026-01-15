// DOM 요소
const usdInput = document.getElementById('usdInput');
const krwOutput = document.getElementById('krwOutput');
const convertBtn = document.getElementById('convertBtn');
const rateInfo = document.getElementById('rateInfo');

// 환율 저장 변수
let exchangeRate = null;

// 숫자를 천 단위 구분 기호로 포맷팅
const formatNumber = (number) => {
  return number.toLocaleString('ko-KR');
};

// 환율 정보 가져오기
const getExchangeRate = async () => {
  const apiUrl = `https://v6.exchangerate-api.com/v6/${CONFIG.apiKey}/latest/USD`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result !== 'success') {
      throw new Error('환율 정보를 가져오는데 실패했습니다.');
    }

    exchangeRate = data.conversion_rates.KRW;
    rateInfo.textContent = `현재 환율: 1 USD = ${formatNumber(exchangeRate)} KRW`;
  } catch (error) {
    rateInfo.textContent = '환율 정보를 가져올 수 없습니다.';
    console.error(error);
  }
};

// USD를 KRW로 변환
const convertCurrency = () => {
  const usd = parseFloat(usdInput.value);

  if (isNaN(usd) || usd < 0) {
    krwOutput.value = '';
    return;
  }

  if (exchangeRate === null) {
    krwOutput.value = '환율 로딩 중...';
    return;
  }

  const krw = Math.round(usd * exchangeRate);
  krwOutput.value = formatNumber(krw);
};

// 이벤트 리스너
convertBtn.addEventListener('click', convertCurrency);

// Enter 키로도 변환 가능
usdInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    convertCurrency();
  }
});

// 페이지 로드 시 환율 정보 가져오기
getExchangeRate();
