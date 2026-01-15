import 'dotenv/config';
import * as readline from 'readline';

// API 키를 환경변수에서 가져오기
const apiKey = process.env.EXCHANGE_API_KEY;
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// 숫자를 천 단위 구분 기호로 포맷팅
const formatNumber = (number) => {
  return number.toLocaleString('ko-KR');
};

// 환율 정보 가져오기
const getExchangeRate = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.result !== 'success') {
    throw new Error('환율 정보를 가져오는데 실패했습니다.');
  }

  return data.conversion_rates.KRW;
};

// USD를 KRW로 변환
const convertUsdToKrw = (usd, rate) => {
  return usd * rate;
};

// 메인 함수
const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // 사용자 입력을 Promise로 감싸기
  const question = (prompt) => {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  };

  console.log('=== USD → KRW 환율 계산기 ===\n');

  try {
    // 환율 정보 가져오기
    console.log('환율 정보를 가져오는 중...');
    const exchangeRate = await getExchangeRate();
    console.log(`현재 환율: 1 USD = ${formatNumber(exchangeRate)} KRW\n`);

    // 반복해서 변환 수행
    while (true) {
      const input = await question('변환할 USD 금액을 입력하세요 (종료: q): ');

      // 종료 조건
      if (input.toLowerCase() === 'q') {
        console.log('\n프로그램을 종료합니다.');
        break;
      }

      const usd = parseFloat(input);

      // 유효성 검사
      if (isNaN(usd) || usd < 0) {
        console.log('올바른 금액을 입력해주세요.\n');
        continue;
      }

      // 변환 및 결과 출력
      const krw = convertUsdToKrw(usd, exchangeRate);
      console.log(`${formatNumber(usd)} USD = ${formatNumber(Math.round(krw))} KRW\n`);
    }
  } catch (error) {
    console.error('오류 발생:', error.message);
  } finally {
    rl.close();
  }
};

main();
