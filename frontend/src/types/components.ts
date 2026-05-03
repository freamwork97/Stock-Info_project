import type { PredictionData } from './api';

export interface DeltaPillProps {
  price: number;
  prev: number;
  big?: boolean;
  dp?: number;
}

export interface BackLinkProps {
  to: string;
  children?: React.ReactNode;
}

export interface StatProps {
  label: string;
  value: string | number;
  cls?: string;
}

export type MiniStatProps = StatProps;

export interface SparklineProps {
  data: number[];
  height?: number;
  color?: string;
  fill?: boolean;
}

export interface LineChartViewProps {
  labels?: string[];
  data: number[];
  height?: number;
  color?: string;
}

export interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface CandleChartViewProps {
  candles: CandleData[];
  height?: number;
  movingAverages?: number[];
  maColors?: Record<number, string>;
}

export interface HistoryPoint {
  date: string;
  close: number;
}

export interface PredictChartViewProps {
  history: HistoryPoint[];
  prediction: PredictionData | null;
  height?: number;
}

export interface ExchangeRateTableProps {
  exchangeRates?: import('./api').ExchangeRate[];
}

export interface SearchTermProps {
  searchTerm: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export type SearchVariant = 'hero' | 'inline';
export type SearchTargetPage = '/' | 'predict' | 'chart';

export interface SearchInputProps {
  variant?: SearchVariant;
  toPage?: SearchTargetPage;
  placeholder?: string;
}
