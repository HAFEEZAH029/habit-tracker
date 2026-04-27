"use client";

import { useState, useEffect } from "react";
import { Habit } from "../../types/habit";
import { validateHabitName } from "../../lib/validators";
import { createHabit, updateHabit } from "../../lib/habits";
import { getSession } from "../../lib/auth";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Habit | null; // for edit mode
};

export default function HabitForm({isOpen, onClose, onSuccess, initialData,}: Props) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string; description?: string; }>({});
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData, isOpen]);

  useEffect(() => {
  function handleEsc(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  document.addEventListener("keydown", handleEsc);

  return () => {
    document.removeEventListener("keydown", handleEsc);
  };
}, [onClose]);

  if (!isOpen) return null;

  function handleSubmit(formData: FormData) {
    const rawName = String(formData.get("name") || "");
    const rawDescription = String(formData.get("description") || "");

    const nameValidation = validateHabitName(rawName);

    const newErrors: typeof errors = {};

    if (!nameValidation.valid) {
      newErrors.name = nameValidation.error || "";
    }

    if (rawDescription.length > 100) {
      newErrors.description = "Description must be under 100 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const session = getSession();
    if (!session) return;

    if (isEditMode && initialData) {
      updateHabit({
        ...initialData,
        name: nameValidation.value,
        description: rawDescription,
      });
    } else {
      createHabit(session.userId, nameValidation.value, rawDescription);
    }

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-(--primary)">
            {isEditMode ? "Edit Habit" : "Create Habit"}
          </h2>

          <button onClick={onClose} className="text-xl text-slate-400">
            x
          </button>
        </div>

        <form action={handleSubmit} data-testid="habit-form">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                HABIT NAME
              </label>

              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Read for 30 minutes"
                data-testid="habit-name-input"
                required
                className={`w-full rounded-xl px-4 py-3 bg-slate-100 border ${
                  errors.name ? "border-red-500" : "border-slate-200"
                }`}
              />

              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>


            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                DESCRIPTION
              </label>

              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Why is this habit important to you?"
                data-testid="habit-description-input"
                className={`w-full rounded-xl px-4 py-3 bg-slate-100 border ${
                  errors.description ? "border-red-500" : "border-slate-200"
                }`}
              />

              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                FREQUENCY
              </label>

              <select
                name="frequency"
                defaultValue="daily"
                data-testid="habit-frequency-select"
                className="w-full rounded-xl px-4 py-3 bg-slate-100 border border-slate-200"
              >
                <option value="daily">Daily</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              type="submit"
              data-testid="habit-save-button"
              className="w-full bg-(--primary) text-white py-3 rounded-xl font-semibold hover:opacity-90"
            >
              Save Habit
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl border border-slate-200 text-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}