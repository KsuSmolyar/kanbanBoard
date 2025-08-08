import type { TagKey } from "../../types/tags";

export interface CardProps {
  id: string;
  index: number;
  content: string;
  description?: string;
  tags?: TagKey[],
  deadline?: string | null
}
