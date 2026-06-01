"use client";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { Landing } from "@/components/Landing";
import { GameBoard } from "@/components/GameBoard";
import { TwisterChallenge } from "@/components/TwisterChallenge";
import { ResultCard } from "@/components/ResultCard";
import { GameOver } from "@/components/GameOver";
import { Wallet } from "@/components/Wallet";

export default function Home() {
  const { phase, balance, playerName } = useGameStore();

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {phase !== "landing" && phase !== "gameover" && (
        <Wallet balance={balance} name={playerName} />
      )}

      <div className="flex-1 w-full max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {phase === "landing" && <Landing key="landing" />}
          {phase === "board" && <GameBoard key="board" />}
          {phase === "challenge" && <TwisterChallenge key="challenge" />}
          {phase === "result" && <ResultCard key="result" />}
          {phase === "gameover" && <GameOver key="gameover" />}
        </AnimatePresence>
      </div>
    </main>
  );
}
