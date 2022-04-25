export type Game<T> = {
  id: number;
  isWin: boolean;
  sapperSchemes: SapperScheme<T>;
}

export type SapperScheme<T> = {
  id: number;
  scheme: Array<Array<T>>;
}

export type SchemeWithState  = {
  value: number;
  isHide: boolean;
  isSetFlag: boolean;
}

