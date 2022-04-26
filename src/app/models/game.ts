export type Game = {
  id: number;
  isWin: boolean;
  sapperSchemes: SapperScheme;
};

export type SapperScheme = {
  id: number;
  scheme: Array<Array<number>>;
};
