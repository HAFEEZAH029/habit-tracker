"use client";

import { Habit } from "../../types/habit";
import HabitCard from "./HabitCard";

type Props = {
  habits: Habit[];
  onEdit: (habit: Habit) => void;
  onChange: () => void;
};

export default function HabitList({ habits, onEdit, onChange }: Props) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-sm font-semibold text-slate-700">Your habits</h2>
        <p className="text-xs text-slate-500">{habits.length} in total</p>
      </div>

      <div className="space-y-3">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onEdit={onEdit}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  );
}