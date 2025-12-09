"use client";

import React from "react";

const COLUMNS = 14;
const ROWS = 26;

function makeColumnString(seed: number): string {
  const chars = "01{}[]<>/=+*-";
  let out = "";
  for (let i = 0; i < ROWS; i++) {
    const idx = (i * 7 + seed * 13) % chars.length;
    out += chars[idx];
    if (i < ROWS - 1) out += "\n";
  }
  return out;
}

export default function CodeRainPanel() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl border border-cyan-400/40 bg-black/80">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_60%),radial-gradient(circle_at_bottom,rgba(129,140,248,0.25),transparent_60%)]" />

      <div className="relative z-10 w-full h-full">
        {Array.from({ length: COLUMNS }).map((_, index) => {
          const left = (index / COLUMNS) * 100;
          const duration = 14 + (index % 5);
          const delay = (index % 8) * 0.8;

          return (
            <div
              key={index}
              className="absolute top-[-120%] code-rain-column text-[10px] leading-[1.1] whitespace-pre text-cyan-200/65"
              style={{
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            >
              {makeColumnString(index)}
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/35 via-transparent to-black/70" />
    </div>
  );
}
