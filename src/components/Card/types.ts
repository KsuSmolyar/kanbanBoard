import type { TagKey } from "../../types/tags";

export interface CardProps {
  id: string;
  index: number;
  title: string;
  description?: string;
  tags?: TagKey[],
  deadline?: string | null,
  user_id?: string
}
