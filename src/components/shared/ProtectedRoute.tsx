"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logoutUser } from "../../lib/auth";
import { getHabitsByUser } from "../../lib/habits";
import { Habit } from "../../types/habit";
import EmptyState from "../dashboard/EmptyState";
import DashBoard from "../dashboard/DashBoard";
import HabitForm from "../habits/HabitForm";
import { IoPersonCircleSharp } from "react-icons/io5";




export default function ProtectedRoute() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const loadHabits = useCallback(() => {
    const session = getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    const userHabits = getHabitsByUser(session.userId);
    setHabits(userHabits);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  function handleCreate() {
    setSelectedHabit(null);
    setIsModalOpen(true);
  }

  function handleEdit(habit: Habit) {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  }

  if (loading) return null;

  return (
    <main
      data-testid="dashboard-page"
      className="min-h-screen bg-(--neutral)"
    >

    <section className="max-w-full flex items-center justify-around px-6 py-4 bg-white">
        <div className="flex items-center gap-2">
          <IoPersonCircleSharp className="text-3xl text-(--primary) w-8 h-8 cursor-pointer" />
          <h1 className="font-semibold text-(--primary) text-lg">
             Routines
          </h1>
        </div>

        <button
          onClick={handleLogout}
          data-testid="auth-logout-button"
          aria-label="logout"
          className="text-sm text-slate-600 hover:text-black"
        >
          Logout
        </button>
      </section>

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-16">
        {habits.length === 0 ? (
          <EmptyState onCreate={handleCreate} />
        ) : (
          <DashBoard habits={habits} onCreate={handleCreate} onEdit={handleEdit} onChange={loadHabits} />
        )}
      </div>

      {isModalOpen && (
        <HabitForm
          key={selectedHabit?.id || "create"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={loadHabits}
          initialData={selectedHabit}
        />
      )}
    </main>
  );
}
