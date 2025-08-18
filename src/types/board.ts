import type { TagKey } from "./tags";

export interface CardType {
  id: string;
  title: string;
  description?: string;
  tags?: TagKey[];
  deadline?: string | null; // ISO date string, e.g. "2025-08-06"
  status?: ColumnsId,
  user_id?: string
}

export interface ColumnType {
  id: ColumnsId;
  title: string;
  cards: CardType[];
}

export const columnIdType = {
  todo: "todo",
  in_progress: "in_progress",
  done: "done"
} as const;

export type ColumnsId = keyof typeof columnIdType;

export type SortType = 'created' | 'deadline' | 'alphabet';
