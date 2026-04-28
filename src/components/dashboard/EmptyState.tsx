
type Props = {
  onCreate: () => void;
};

const EmptyState = ({ onCreate }: Props) => {

    return (
      <>
          <div data-testid="empty-state" className="max-w-lg w-full">

            <h2 className="text-3xl font-bold text-(--primary) mb-3">
              Start Your Journey
            </h2>

            <p className="text-slate-500 mb-6">
              Create your first habit to begin tracking your progress
            </p>

            <button
              data-testid="create-habit-button"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold mb-8 hover:opacity-90 transition"
              onClick={onCreate}
              role="button"
              aria-label="create habit"
            >
              + Add My First Habit
            </button>


            <div className="flex gap-4 justify-center mb-10">
              <div className="bg-white rounded-xl p-4 shadow-sm text-left w-[50%]">
                <p className="text-xs font-semibold text-slate-400 mb-1">
                  INSPIRATION
                </p>
                <p className="text-sm text-(--primary)">
                  Get inspired to do more
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm text-left w-[50%]">
                <p className="text-xs font-semibold text-slate-400 mb-1">
                  GROWTH
                </p>
                <p className="text-sm text-(--primary)">
                  Track your progress over time
                </p>
              </div>
            </div>


            <p className="text-sm text-slate-500 italic">
              "Success is the product of daily habits—not once-in-a-lifetime
              transformations."
            </p>
            <p className="text-sm mt-2 text-(--primary)">
              — James Clear
            </p>
          </div>
      </>
    )
}

export default EmptyState
