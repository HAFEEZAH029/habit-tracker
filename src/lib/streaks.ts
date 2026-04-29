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

  const streakStartDate = uniqueDates.includes(currentDate)
    ? currentDate
    : getPreviousDate(currentDate);

  if (!uniqueDates.includes(streakStartDate)) return 0;

  let streak = 1;
  let checkDate = streakStartDate;

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
