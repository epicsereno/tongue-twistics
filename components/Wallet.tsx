"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Wallet({ balance, name }: { balance: number; name: string }) {
  const prev = useRef(balance);
  const [flash, setFlash] = useState<"gain" | "loss" | null>(null);

  useEffect(() => {
    if (balance > prev.current) setFlash("gain");
    else if (balance < prev.current) setFlash("loss");
    prev.current = balance;
    const t = setTimeout(() => setFlash(null), 800);
    return () => clearTimeout(t);
  }, [balance]);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
      <div className="text-sm text-zinc-400 font-mono uppercase tracking-widest">
        {name || "Player"}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={balance}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`font-mono text-xl font-bold tabular-nums ${
            flash === "gain"
              ? "text-green-400"
              : flash === "loss"
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          ${balance.toLocaleString()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
