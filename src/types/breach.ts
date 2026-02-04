export interface BreachResult {
  isBreached: boolean;
  count: number;
  checkedAt: Date;
}

export type LoadingState = 'idle' | 'hashing' | 'fetching' | 'done' | 'error';