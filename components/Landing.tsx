"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";

export function Landing() {
  const [name, setName] = useState("");
  const { startGame } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-8 px-6 py-10 text-center"
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
        className="text-7xl"
      >
        🤑
      </motion.div>

      <div>
        <h1 className="text-4xl font-black text-white tracking-tight leading-none">
          TONGUE
        </h1>
        <h1 className="text-4xl font-black tracking-tight leading-none" style={{ color: "#facc15" }}>
          TWISTICS
        </h1>
        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-2">
          Cash Word Warz Edition
        </div>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3 text-left bg-zinc-900 rounded-2xl p-4 text-sm font-mono text-zinc-400">
        <div className="text-zinc-300 font-black text-xs uppercase tracking-widest mb-1">How to play</div>
        <div>🎯 Pick a category + dollar value from the board</div>
        <div>⌨️ Type the tongue twister before time runs out</div>
        <div>✅ 85%+ accuracy = you WIN the cash</div>
        <div>💀 Under 85% = you LOSE the wager</div>
        <div>⚡ Speed bonus up to 1.5x on clean clears</div>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) startGame(name.trim()); }}
          placeholder="Enter your name..."
          maxLength={20}
          className="w-full bg-zinc-900 border-2 border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 font-mono text-white text-base outline-none transition-colors placeholder:text-zinc-600 text-center"
        />
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => name.trim() && startGame(name.trim())}
          disabled={!name.trim()}
          className="w-full py-4 rounded-xl font-black text-base uppercase tracking-widest transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed bg-yellow-400 text-black hover:bg-yellow-300"
        >
          Let&apos;s Get This Bread 🍞
        </motion.button>
      </div>

      <div className="text-xs text-zinc-700 font-mono">
        Starting cash: $1,000 · 25 rounds · virtual currency
      </div>
    </motion.div>
  );
}
