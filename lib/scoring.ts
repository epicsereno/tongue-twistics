export function calcAccuracy(target: string, typed: string): number {
  const t = target.toLowerCase();
  const u = typed.toLowerCase().slice(0, t.length);
  if (t.length === 0) return 0;
  let correct = 0;
  for (let i = 0; i < u.length; i++) {
    if (u[i] === t[i]) correct++;
  }
  return Math.round((correct / t.length) * 100);
}

export function calcDelta(
  wager: number,
  accuracy: number,
  timeUsed: number,
  timeLimit: number
): { won: boolean; delta: number } {
  const speedBonus = Math.max(0, (timeLimit - timeUsed) / timeLimit);
  if (accuracy >= 85) {
    const multiplier = 1 + speedBonus * 0.5; // up to 1.5x for fast clears
    return { won: true, delta: Math.round(wager * multiplier) };
  }
  if (accuracy >= 60) {
    return { won: false, delta: -Math.round(wager * 0.5) };
  }
  return { won: false, delta: -wager };
}

export function getCharStates(
  target: string,
  typed: string
): ("correct" | "wrong" | "pending")[] {
  return target.split("").map((ch, i) => {
    if (i >= typed.length) return "pending";
    return typed[i].toLowerCase() === ch.toLowerCase() ? "correct" : "wrong";
  });
}
