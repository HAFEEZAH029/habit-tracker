function getPreviousDate(date: string): string {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function calculateCurrentStreak(
  completions: string[],
  today?: string
): number {
  const currentDate = today || new Date().toISOString().split("T")[0];

  const uniqueDates = [...new Set(completions)].sort();

  if (!uniqueDates.includes(currentDate)) return 0;

  let streak = 1;
  let checkDate = currentDate;

  while (true) {
    checkDate = getPreviousDate(checkDate);

    if (uniqueDates.includes(checkDate)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}