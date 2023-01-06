// 중복되는 URL 처리
const BASE_URL = `https://api.coinpaprika.com/v1`;

// async await 대신 Promise 사용
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}

// 여기서는 coinId를 정의하지 않음
// 사용자가 클릭했을 때 coinId를 받아서 사용하고, 여기서는 타입 정의만 함

export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 23 * 7 * 1;
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
