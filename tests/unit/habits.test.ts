import { describe, it, expect } from "vitest";
import { toggleHabitCompletion } from "../../src/lib/habits";
import { Habit } from "../../src/types/habit";

describe('toggleHabitCompletion', () => {
  const baseHabit: Habit = {
    id: "1",
    userId: "user1",
    name: "Test Habit",
    description: "",
    frequency: "daily",
    createdAt: new Date().toISOString(),
    completions: [],
  };

  const today = "2026-04-27";

  it('adds a completion date when the date is not present', () => {
    const updated = toggleHabitCompletion(baseHabit, today);
    expect(updated.completions).toContain(today);
  });

  it('removes a completion date when the date already exists', () => {
    const habit = { ...baseHabit, completions: [today] };
    const updated = toggleHabitCompletion(habit, today);

    expect(updated.completions).not.toContain(today);
  });

  it('does not mutate the original habit object', () => {
    const updated = toggleHabitCompletion(baseHabit, today);

    expect(baseHabit.completions).toEqual([]);
    expect(updated).not.toBe(baseHabit);
  });

  it('does not return duplicate completion dates', () => {
    const habit = { ...baseHabit, completions: [today] };
    const updated = toggleHabitCompletion(habit, today);

    expect(new Set(updated.completions).size).toBe(updated.completions.length);
  });
});
