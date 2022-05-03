export type Game = {
  id: number;
  isWin: boolean;
  sapperSchemes: SapperScheme;
};

export type SapperScheme = {
  id: number;
  countBombs: number;
  scheme: Array<Array<number>>;
};

export type CellWithState = {
  value: number;
  isOpen: boolean;
  isFlag: boolean;
  isPress: boolean;
  countNearbyFlags: number;
  coords: Coords;
};

export type Coords = {
  x: number;
  y: number;
};
export type QueryParams = {
  width: string;
  height: string;
};
