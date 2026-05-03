export interface DailyPrice {
  date: string;
  open: number | string;
  high: number | string;
  low: number | string;
  close: number | string;
  volume: number | string;
}

export interface StockInfo {
  company: string;
  code: string;
  daily_prices: DailyPrice[];
}

export interface StockPriceResponse {
  날짜: string[];
  시가: number[];
  고가: number[];
  저가: number[];
  종가: number[];
  거래량: number[];
}

export interface LatestStockPrice {
  고가: number;
  전일종가: number;
  시가: number;
  저가: number;
  종가: number;
  거래량: number;
}

export interface ExchangeRate {
  currency: string;
  exchange_rate: string | number;
}

export interface NewsItem {
  title: string;
  link: string;
}

export interface FinancialStatement {
  사업연도: string;
  재무제표구분: string;   // 'BS' | 'IS'
  계정명: string;
  당기명: string;
  당기금액: number | null;  // 억원 단위
}

export type KeyIndexResponse = Record<string, Record<string, number>>;

export interface KeyIndexEntry {
  latest: number;
  prev: number;
  dates: string[];
  values: number[];
}
export type KeyIndexState = Record<string, KeyIndexEntry>;

export interface PredictResponse {
  날짜: string[];
  예측종가: number[];
  예측고가: number[];
  예측저가: number[];
}

export interface PredictionData {
  dates: string[];
  close: number[];
  high: number[];
  low: number[];
}

export interface Post {
  id: number;
  title: string;
  author: string;
  password: string;
  content: string;
  created_at: string;
}

export interface PostForm {
  title: string;
  author: string;
  password: string;
  content: string;
}
