import { Habit } from "../../types/habit";
import HabitList from "../habits/HabitList";
import { calculateCurrentStreak } from "@/app/lib/streaks";
import { FaPlus } from "react-icons/fa6";


type Props = {
  habits: Habit[];
  onCreate: () => void;
  onEdit: (habit: Habit) => void;
  onChange: () => void;
};

function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};

export default function DashBoard({ habits, onCreate, onEdit, onChange }: Props) {

  const today = getTodayISO();

  const remaining = habits.filter( (h) => !h.completions.includes(today)).length;

  const bestStreak = Math.max(
    0,
    ...habits.map((h) =>
      calculateCurrentStreak(h.completions, today)
    )
  );

  function getStreakMessage(streak: number) {
  if (streak === 0) {
    return "Start your first streak today";
  }

  if (streak === 1) {
    return "Great start — keep going!";
  }

  return "Keep it going today";
}

  return (
    <section className="w-full max-w-4xl">
      <div className="text-left mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-(--primary)">
          {getGreeting()}, Champion
        </h1>

        <p className="text-sm text-slate-500">
          You have {remaining} habit{remaining !== 1 && "s"} remaining for today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-center sm:text-left font-semibold text-slate-400 mb-2 tracking-widest">
            DAILY MOTIVATION
          </p>

          <p className="text-sm text-center sm:text-left text-(--primary) italic">
            "The secret of your future is hidden in your daily routine."
          </p>
        </div>

        <div className="rounded-2xl p-5 text-white bg-linear-to-br from-slate-900 to-slate-800 shadow-sm">
          <p className="text-xs font-semibold opacity-70 mb-2">
            🔥 CURRENT BEST STREAK
          </p>

          <p className="text-2xl font-bold">{bestStreak} Days</p>

          <p className="text-xs opacity-70 mt-1">
            {getStreakMessage(bestStreak)}
          </p>
        </div>
      </div>

      <HabitList habits={habits} onEdit={onEdit} onChange={onChange} />

      <button
        onClick={onCreate}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-(--primary) text-white shadow-lg"
        data-testid="create-habit-button"
        aria-label="Add habit"
        role="button"
      >
        <FaPlus className="ml-5" />
      </button>
    </section>
  );
}
