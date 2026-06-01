"use client";
import { create } from "zustand";
import { CATEGORIES, TWISTERS, VALUES } from "./twisters";
import type { BoardCell, GamePhase, RoundResult, TwisterEntry } from "@/types/game";

const STARTING_BALANCE = 1000;

function buildBoard(): BoardCell[][] {
  return CATEGORIES.map((cat) =>
    VALUES.map((val) => {
      const twister = TWISTERS.find(
        (t) => t.categoryId === cat.id && t.value === val
      )!;
      return { twister, state: "open" as const };
    })
  );
}

type GameStore = {
  phase: GamePhase;
  playerName: string;
  balance: number;
  board: BoardCell[][];
  activeTwister: TwisterEntry | null;
  lastResult: RoundResult | null;
  history: RoundResult[];

  startGame: (name: string) => void;
  selectCell: (catIdx: number, valIdx: number) => void;
  resolveRound: (result: RoundResult) => void;
  nextRound: () => void;
  resetGame: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  phase: "landing",
  playerName: "",
  balance: STARTING_BALANCE,
  board: buildBoard(),
  activeTwister: null,
  lastResult: null,
  history: [],

  startGame: (name) =>
    set({ phase: "board", playerName: name, balance: STARTING_BALANCE, board: buildBoard(), history: [] }),

  selectCell: (catIdx, valIdx) => {
    const board = get().board;
    if (board[catIdx][valIdx].state !== "open") return;
    const twister = board[catIdx][valIdx].twister;
    const newBoard = board.map((row, ci) =>
      row.map((cell, vi) =>
        ci === catIdx && vi === valIdx ? { ...cell, state: "active" as const } : cell
      )
    );
    set({ board: newBoard, activeTwister: twister, phase: "challenge" });
  },

  resolveRound: (result) => {
    const { board, balance, history } = get();
    const newBalance = Math.max(0, balance + result.delta);
    const newBoard = board.map((row) =>
      row.map((cell) =>
        cell.twister.id === result.twisterId
          ? { ...cell, state: result.won ? ("won" as const) : ("lost" as const) }
          : cell
      )
    );
    const newHistory = [...history, result];
    const allDone = newBoard.every((row) => row.every((c) => c.state !== "open"));
    set({
      board: newBoard,
      balance: newBalance,
      lastResult: result,
      history: newHistory,
      phase: allDone ? "gameover" : "result",
    });
  },

  nextRound: () => {
    const { board } = get();
    const allDone = board.every((row) => row.every((c) => c.state !== "open"));
    set({ phase: allDone ? "gameover" : "board", activeTwister: null, lastResult: null });
  },

  resetGame: () =>
    set({
      phase: "landing",
      playerName: "",
      balance: STARTING_BALANCE,
      board: buildBoard(),
      activeTwister: null,
      lastResult: null,
      history: [],
    }),
}));
