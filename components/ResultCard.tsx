"use client";
import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";

export function ResultCard() {
  const { lastResult, nextRound, activeTwister } = useGameStore();
  if (!lastResult) return null;

  const won = lastResult.won;
  const accent = won ? "#00ff88" : "#ff3366";
  const emoji = won ? "💰" : "💀";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      className="flex flex-col items-center gap-6 p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.4, 1] }}
        transition={{ duration: 0.4 }}
        className="text-7xl"
      >
        {emoji}
      </motion.div>

      <div
        className="text-4xl font-black"
        style={{ color: accent }}
      >
        {won ? "CLEAN!" : "BRICKED!"}
      </div>

      <div className="flex gap-6 text-sm font-mono">
        <div className="flex flex-col items-center gap-1">
          <span className="text-zinc-500 uppercase tracking-widest text-xs">Accuracy</span>
          <span className="text-white font-black text-xl">{lastResult.accuracy}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-zinc-500 uppercase tracking-widest text-xs">Time Used</span>
          <span className="text-white font-black text-xl">{lastResult.timeUsed}s</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-zinc-500 uppercase tracking-widest text-xs">Cash</span>
          <span
            className="font-black text-xl"
            style={{ color: accent }}
          >
            {lastResult.delta > 0 ? "+" : ""}${lastResult.delta}
          </span>
        </div>
      </div>

      {!won && lastResult.accuracy < 85 && (
        <div className="text-zinc-400 text-sm font-mono bg-zinc-900 rounded-xl px-4 py-2">
          Need 85%+ accuracy to win
        </div>
      )}

      <button
        onClick={nextRound}
        className="w-full py-4 rounded-xl font-black text-base uppercase tracking-widest transition-all duration-150 hover:scale-105"
        style={{ background: accent, color: "#000" }}
      >
        Back to Board
      </button>
    </motion.div>
  );
}
