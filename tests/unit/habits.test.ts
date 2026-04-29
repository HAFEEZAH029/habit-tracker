import { describe, it, expect, beforeEach } from "vitest";
import { toggleHabitCompletion, createHabit, updateHabit, deleteHabit, getHabitsByUser } from "../../src/lib/habits";
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

describe('habits utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates a habit and stores it in localStorage', () => {
    const habit = createHabit("1", "Read", "");

    const stored = JSON.parse(
      localStorage.getItem("habit-tracker-habits") || "[]"
    );

    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe("Read");
    expect(habit.userId).toBe("1");
  });

  it('retrieves habits for a specific user', () => {
    const habits: Habit[] = [
      {
        id: "1",
        userId: "1",
        name: "A",
        description: "",
        frequency: "daily",
        createdAt: "date",
        completions: [],
      },
      {
        id: "2",
        userId: "2",
        name: "B",
        description: "",
        frequency: "daily",
        createdAt: "date",
        completions: [],
      },
    ];

    localStorage.setItem("habit-tracker-habits", JSON.stringify(habits));

    const result = getHabitsByUser("1");

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("A");
  });

  it('updates an existing habit', () => {
    const habit: Habit = {
      id: "1",
      userId: "1",
      name: "Old",
      description: "",
      frequency: "daily", // 👈 literal type
      createdAt: "date",
      completions: [],
    };

    localStorage.setItem("habit-tracker-habits", JSON.stringify([habit]));

    const updated: Habit = {
      ...habit,
      name: "New",
    };

    updateHabit(updated);

    const stored = JSON.parse(
      localStorage.getItem("habit-tracker-habits") || "[]"
    );

    expect(stored[0].name).toBe("New");
  });

  it('deletes a habit from localStorage', () => {
    const habit: Habit = {
      id: "1",
      userId: "1",
      name: "Delete",
      description: "",
      frequency: "daily",
      createdAt: "date",
      completions: [],
    };

    localStorage.setItem("habit-tracker-habits", JSON.stringify([habit]));

    deleteHabit("1");

    const stored = JSON.parse(
      localStorage.getItem("habit-tracker-habits") || "[]"
    );

    expect(stored.length).toBe(0);
  });
});
