import { describe, it, expect } from "vitest";
import { calculateCurrentStreak } from "../../src/app/lib/streaks";

describe('calculateCurrentStreak', () => {
  const today = "2026-04-27";

  it('returns 0 when completions is empty', () => {
    expect(calculateCurrentStreak([], today)).toBe(0);
  });

  it('returns 0 when today is not completed', () => {
    expect(calculateCurrentStreak(["2026-04-26"], today)).toBe(0);
  });

  it('returns the correct streak for consecutive completed days', () => {
    const completions = ["2026-04-27", "2026-04-26", "2026-04-25"];
    expect(calculateCurrentStreak(completions, today)).toBe(3);
  });

  it('ignores duplicate completion dates', () => {
    const completions = ["2026-04-27", "2026-04-27", "2026-04-26"];
    expect(calculateCurrentStreak(completions, today)).toBe(2);
  });

  it('breaks the streak when a calendar day is missing', () => {
    const completions = ["2026-04-27", "2026-04-25"];
    expect(calculateCurrentStreak(completions, today)).toBe(1);
  });
});