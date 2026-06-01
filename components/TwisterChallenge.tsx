"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { calcAccuracy, calcDelta, getCharStates } from "@/lib/scoring";
import { CATEGORIES } from "@/lib/twisters";

export function TwisterChallenge() {
  const { activeTwister, resolveRound } = useGameStore();
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(
    (finalTyped: string, finalTime: number) => {
      if (!activeTwister || submitted) return;
      setSubmitted(true);
      const accuracy = calcAccuracy(activeTwister.text, finalTyped);
      const timeUsed = activeTwister.timeLimit - finalTime;
      const { won, delta } = calcDelta(
        activeTwister.value,
        accuracy,
        timeUsed,
        activeTwister.timeLimit
      );
      resolveRound({ twisterId: activeTwister.id, accuracy, timeUsed, won, delta });
    },
    [activeTwister, resolveRound, submitted]
  );

  useEffect(() => {
    if (!activeTwister) return;
    setTyped("");
    setSubmitted(false);
    setTimeLeft(activeTwister.timeLimit);
    inputRef.current?.focus();

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTwister]);

  // auto-submit on timeout
  useEffect(() => {
    if (timeLeft === 0 && !submitted && activeTwister) submit(typed, 0);
  }, [timeLeft, submitted, activeTwister, typed, submit]);

  if (!activeTwister) return null;

  const cat = CATEGORIES.find((c) => c.id === activeTwister.categoryId)!;
  const charStates = getCharStates(activeTwister.text, typed);
  const pct = (timeLeft / activeTwister.timeLimit) * 100;
  const timerColor = pct > 50 ? "#00ff88" : pct > 25 ? "#facc15" : "#ff3366";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="flex flex-col gap-5 p-4"
    >
      <div className="flex items-center justify-between">
        <div
          className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ color: cat.color, background: `${cat.color}22` }}
        >
          {cat.emoji} {cat.name}
        </div>
        <div className="font-mono font-black text-yellow-400 text-lg">
          ${activeTwister.value}
        </div>
      </div>

      {/* Timer bar */}
      <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: timerColor }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </div>
      <div
        className="text-center font-mono text-3xl font-black tabular-nums"
        style={{ color: timerColor }}
      >
        {timeLeft}s
      </div>

      {/* Per-char colored display */}
      <div className="bg-zinc-900 rounded-2xl p-4 font-mono text-lg leading-relaxed tracking-wide break-words">
        {charStates.map((state, i) => (
          <span
            key={i}
            className={
              state === "correct"
                ? "text-green-400"
                : state === "wrong"
                ? "text-red-400 underline decoration-red-600"
                : "text-zinc-500"
            }
          >
            {activeTwister.text[i]}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => { if (!submitted) setTyped(e.target.value); }}
        onKeyDown={(e) => { if (e.key === "Enter") submit(typed, timeLeft); }}
        disabled={submitted}
        placeholder="Type it here..."
        className="w-full bg-zinc-900 border-2 border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 font-mono text-white text-base outline-none transition-colors placeholder:text-zinc-600"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      <button
        onClick={() => submit(typed, timeLeft)}
        disabled={submitted || typed.length === 0}
        className="w-full py-3 rounded-xl font-black text-base uppercase tracking-widest transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: cat.color, color: "#000" }}
      >
        {submitted ? "Grading..." : "Submit ↵"}
      </button>
    </motion.div>
  );
}
