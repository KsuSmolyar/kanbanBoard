const normalizeDate = (date: Date | string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getDeadlineAndToday = (deadlineIso?: string | null) => {
  if (!deadlineIso) return null;
  const today = normalizeDate(new Date());
  const deadline = normalizeDate(new Date(deadlineIso));
  return { today, deadline };
};

export const isOverdue = (deadlineIso?: string | null): boolean => {
   const dates = getDeadlineAndToday(deadlineIso);
    if (!dates) return false;
    return dates.deadline < dates.today;
};

export const isDueToday = (deadlineIso?: string | null): boolean => {
  const dates = getDeadlineAndToday(deadlineIso);
  if (!dates) return false;
  return dates.deadline.getTime() === dates.today.getTime();
};

export const formatDateReadable = (iso?: string | null): string => {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("ru-RU");
};

// возвращает true, если deadline (iso string) в диапазоне from..to (включительно)
export const isInRange = (deadline?: string | null, from?: string | null, to?: string | null) => {
  if (!deadline) return false;

  const dates = getDeadlineAndToday(deadline);
  if (!dates) return false;

  if (from) {
    const normalizeFrom = normalizeDate(from)
    if (dates.today < normalizeFrom) return false;
  }
  if (to) {
    const normalizeTo = normalizeDate(to)
    if (dates.deadline > normalizeTo) return false;
  }
  return true;
};
