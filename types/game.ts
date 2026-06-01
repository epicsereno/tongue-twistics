export type Category = {
  id: string;
  name: string;
  emoji: string;
  color: string;
};

export type TwisterEntry = {
  id: string;
  categoryId: string;
  value: number;
  text: string;
  timeLimit: number; // seconds
};

export type CellState = "open" | "active" | "won" | "lost";

export type BoardCell = {
  twister: TwisterEntry;
  state: CellState;
};

export type RoundResult = {
  twisterId: string;
  accuracy: number;
  timeUsed: number;
  won: boolean;
  delta: number;
};

export type GamePhase =
  | "landing"
  | "board"
  | "challenge"
  | "result"
  | "gameover";
