export interface Game {
  id: number;
  isWin: boolean;
  sapperSchemes: SapperScheme;
}

export interface SapperScheme {
  id: number;
  scheme: Array<Array<Scheme>>;
}

export interface Scheme {
  value: number;
  isHide: boolean;
  isSetFlag: boolean;
}
