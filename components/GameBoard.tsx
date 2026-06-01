"use client";
import { motion } from "framer-motion";
import { CATEGORIES, VALUES } from "@/lib/twisters";
import { useGameStore } from "@/lib/gameStore";
import type { BoardCell } from "@/types/game";

const STATE_STYLES: Record<BoardCell["state"], string> = {
  open: "hover:scale-105 hover:brightness-125 cursor-pointer",
  active: "opacity-60 cursor-not-allowed",
  won: "opacity-30 cursor-not-allowed line-through",
  lost: "opacity-20 cursor-not-allowed",
};

export function GameBoard() {
  const { board, selectCell } = useGameStore();

  return (
    <div className="overflow-x-auto px-2 py-4">
      <div
        className="grid gap-2 min-w-[340px]"
        style={{ gridTemplateColumns: `repeat(${VALUES.length}, minmax(0, 1fr))` }}
      >
        {/* Header row */}
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="text-center py-2 rounded-lg text-xs font-black uppercase tracking-wider"
            style={{ color: cat.color, background: `${cat.color}18` }}
          >
            <div className="text-xl mb-1">{cat.emoji}</div>
            {cat.name}
          </div>
        ))}

        {/* Cells — one column per value, one row per category */}
        {VALUES.map((val, vi) =>
          CATEGORIES.map((cat, ci) => {
            const cell = board[ci][vi];
            return (
              <motion.button
                key={`${cat.id}-${val}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectCell(ci, vi)}
                disabled={cell.state !== "open"}
                className={`relative flex items-center justify-center rounded-xl font-black text-sm py-4 transition-all duration-150 select-none ${STATE_STYLES[cell.state]}`}
                style={{
                  background:
                    cell.state === "won"
                      ? "#1a2e1a"
                      : cell.state === "lost"
                      ? "#2e1a1a"
                      : `${cat.color}22`,
                  border: `2px solid ${cell.state === "open" ? cat.color + "66" : "#ffffff10"}`,
                  color: cell.state === "open" ? cat.color : "#ffffff44",
                }}
              >
                {cell.state === "won" ? (
                  <span className="text-green-600 text-lg">✓</span>
                ) : cell.state === "lost" ? (
                  <span className="text-red-900 text-lg">✗</span>
                ) : (
                  <span>${val}</span>
                )}
              </motion.button>
            );
          })
        )}
      </div>
    </div>
  );
}
