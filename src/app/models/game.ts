export interface Game {
  id: number;
  isWin: boolean;
  sapperSchemes: SapperScheme;
}

export interface SapperScheme {
  id: number;
  scheme: Array<Array<number>>;
}
