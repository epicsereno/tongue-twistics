"use client";
import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";

export function GameOver() {
  const { balance, playerName, history, resetGame } = useGameStore();
  const won = history.filter((r) => r.won).length;
  const total = history.length;
  const winRate = total > 0 ? Math.round((won / total) * 100) : 0;
  const earned = history.reduce((acc, r) => acc + r.delta, 0);
  const isUp = earned >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-8 p-6 text-center"
    >
      <div className="text-6xl">
        {isUp ? "🏆" : "😵"}
      </div>

      <div>
        <div className="text-zinc-500 text-sm uppercase tracking-widest font-mono">
          {playerName}
        </div>
        <div className="text-4xl font-black text-white mt-1">
          Game Over
        </div>
      </div>

      <div className="w-full bg-zinc-900 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 font-mono text-sm">Final Balance</span>
          <span className="text-yellow-400 font-black text-2xl font-mono">${balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 font-mono text-sm">Net Cash</span>
          <span
            className="font-black text-xl font-mono"
            style={{ color: isUp ? "#00ff88" : "#ff3366" }}
          >
            {isUp ? "+" : ""}${earned.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 font-mono text-sm">Win Rate</span>
          <span className="text-white font-black text-xl">{winRate}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 font-mono text-sm">Rounds Won</span>
          <span className="text-white font-black text-xl">{won} / {total}</span>
        </div>
      </div>

      <div className="text-2xl font-black" style={{ color: isUp ? "#00ff88" : "#ff3366" }}>
        {isUp
          ? winRate >= 80
            ? "GOATED. You a real one."
            : "Solid run. Stack up."
          : winRate < 30
          ? "Got cooked. Try again."
          : "Close. Run it back."}
      </div>

      <button
        onClick={resetGame}
        className="w-full py-4 rounded-xl font-black text-base uppercase tracking-widest transition-all duration-150 hover:scale-105 bg-yellow-400 text-black"
      >
        Run It Back
      </button>
    </motion.div>
  );
}
