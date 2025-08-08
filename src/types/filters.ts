import type { TagKey } from "./tags";


export type TasksFilter = {
  query?: string;         // поиск по заголовку
  tags?: TagKey[];       // массив выбранных тегов (если пусто — не фильтруем по тегам)
  from?: string | null;  // iso date "YYYY-MM-DD" или null
  to?: string | null;    // iso date
  onlyOverdue?: boolean; // если true — показываем только просроченные
};
