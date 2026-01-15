# USD → KRW 환율 계산기

ExchangeRate-API를 사용하여 미국 달러(USD)를 한국 원화(KRW)로 변환하는 환율 계산기입니다.

## 기능

- 실시간 환율 정보 조회
- USD를 KRW로 변환
- 천 단위 구분 기호(,)로 금액 표시

## 실행 방법

### 웹 버전

1. `config.js` 파일 생성:
```javascript
const CONFIG = {
  apiKey: 'YOUR_API_KEY'
};
```

2. `index.html` 파일을 브라우저에서 열기

### 콘솔 버전

1. `.env` 파일 생성:
```
EXCHANGE_API_KEY=YOUR_API_KEY
```

2. 의존성 설치 및 실행:
```bash
npm install
npm start
```

## API 키 발급

[ExchangeRate-API](https://www.exchangerate-api.com)에서 무료 API 키를 발급받을 수 있습니다.
