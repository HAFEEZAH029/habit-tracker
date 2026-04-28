"use client";

import { useMemo, useState } from "react";
import { IoCheckmarkCircle, IoCheckmarkCircleOutline, IoPencilOutline, IoTrashOutline, } from "react-icons/io5";
import { Habit } from "../../types/habit";
import { getHabitSlug } from "../../lib/slug";
import { calculateCurrentStreak } from "../../lib/streaks";
import { deleteHabit, toggleHabitCompletionAndSave } from "../../lib/habits";
import DeleteModal from "./DeleteModal";


type Props = {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onChange: () => void;
};

function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function HabitCard({ habit, onEdit, onChange }: Props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const slug = useMemo(() => getHabitSlug(habit.name), [habit.name]);
  const today = getTodayISO();

  const completedToday = habit.completions.includes(today);

  const streak = useMemo(
    () => calculateCurrentStreak(habit.completions, today),
    [habit.completions, today]
  );

  function handleToggleComplete() {
    toggleHabitCompletionAndSave(habit, today);
    onChange();
  }

  function handleConfirmDelete() {
    deleteHabit(habit.id);
    setIsDeleteOpen(false);
    onChange();
  }

  return (
    <article
      data-testid={`habit-card-${slug}`}
      className={`w-full rounded-2xl bg-white shadow-sm border transition overflow-hidden ${
        completedToday ? "border-4 border-l-(--secondary) border-r-transparent border-t-transparent border-b-transparent bg-green-50/40" : "border-slate-100"
      }`}
    >
      <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
        <div className="flex items-start gap-3 min-w-0">
          <button
            type="button"
            onClick={handleToggleComplete}
            data-testid={`habit-complete-${slug}`}
            aria-label={`Toggle completion for ${habit.name}`}
            className="mt-0.5 shrink-0"
          >
            {completedToday ? (
              <IoCheckmarkCircle className="w-5 h-5 sm:w-7 sm:h-7 text-(--secondary)" />
            ) : (
              <IoCheckmarkCircleOutline className="w-5 h-5 sm:w-7 sm:h- text-slate-300" />
            )}
          </button>

          <div className="min-w-0 text-left">
            <h3
              className={`text-base sm:text-lg font-semibold truncate ${
                completedToday
                  ? "text-slate-400 line-through"
                  : "text-(--primary)"
              }`}
            >
              {habit.name}
            </h3>

            {habit.description && (
              <p className={`text-sm line-clamp-2 ${
                completedToday
                  ? "text-slate-400"
                  : "text-slate-500 "
              }`}>
                {habit.description}
              </p>
            )}
          </div>
          <div>
            <p
              data-testid={`habit-streak-${slug}`}
              className={`sm:text-xs text-[10px] px-2 py-1.5 sm:px-3 sm:py-2 font-medium rounded-3xl ${
                streak === 0 ? "bg-slate-200 text-slate-500" : "bg-orange-100 text-orange-400"
              }`}
            >
              🔥 {streak}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(habit)}
            data-testid={`habit-edit-${slug}`}
            aria-label={`Edit ${habit.name}`}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-(--tertiary) hover:border-(--tertiary) transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-slate-500 disabled:hover:border-slate-200"
            disabled={completedToday}
          >
            <IoPencilOutline className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            data-testid={`habit-delete-${slug}`}
            aria-label={`Delete ${habit.name}`}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600 hover:border-red-200 transition"
          >
            <IoTrashOutline className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      <DeleteModal
      isOpen={isDeleteOpen}
      onClose={() => setIsDeleteOpen(false)}
      onConfirm={handleConfirmDelete}
      />
    </article>
  );
}
