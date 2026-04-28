import { Habit } from "../types/habit";
import { STORAGE_KEYS } from "./constants";
import { getStorageItem, setStorageItem } from "./storage";

function generateId() {
  return crypto.randomUUID();
}

export function getHabits(): Habit[] {
  return getStorageItem<Habit[]>(STORAGE_KEYS.HABITS, []);
}

export function getHabitsByUser(userId: string): Habit[] {
  return getHabits().filter((habit) => habit.userId === userId);
}

export function createHabit(userId: string, name: string, description: string): Habit {
  const habits = getHabits();

  const newHabit: Habit = {
    id: generateId(),
    userId,
    name,
    description,
    frequency: "daily",
    createdAt: new Date().toISOString(),
    completions: [],
  };

  setStorageItem(STORAGE_KEYS.HABITS, [...habits, newHabit]);

  return newHabit;
}

export function updateHabit(updatedHabit: Habit) {
  const habits = getHabits().map((habit) =>
    habit.id === updatedHabit.id ? updatedHabit : habit
  );

  setStorageItem(STORAGE_KEYS.HABITS, habits);
}

export function deleteHabit(id: string) {
  const habits = getHabits().filter((habit) => habit.id !== id);

  setStorageItem(STORAGE_KEYS.HABITS, habits);
}

export function toggleHabitCompletion(
  habit: Habit,
  date: string
): Habit {
  const exists = habit.completions.includes(date);

  const completions = exists
    ? habit.completions.filter((d) => d !== date)
    : [...habit.completions, date];

  return {
    ...habit,
    completions: [...new Set(completions)],
  };
}

export function toggleHabitCompletionAndSave(
  habit: Habit,
  date: string
): Habit {
  const updatedHabit = toggleHabitCompletion(habit, date);
  updateHabit(updatedHabit);
  return updatedHabit;
}