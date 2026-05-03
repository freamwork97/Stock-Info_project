export interface FmtOptions {
  compact?: boolean;
  dp?: number;
}

export interface DeltaResult {
  diff: number;
  pct: number;
  isUp: boolean;
}
