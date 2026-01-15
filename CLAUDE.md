# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

ExchangeRate-API를 사용하여 USD를 KRW로 변환하는 환율 계산기입니다.

## 실행 방법

### 웹 버전
`index.html` 파일을 브라우저에서 열기

### 콘솔 버전
```bash
npm install    # 의존성 설치
npm start      # 프로그램 실행
```

## 코딩 스타일

- 변수 이름은 카멜 케이스 사용
- 들여쓰기 2칸
- 주석은 한글로 작성

## 환경 설정

- 콘솔 버전: `.env` 파일에 `EXCHANGE_API_KEY`로 저장
- 웹 버전: `config.js` 파일에 `CONFIG.apiKey`로 저장
