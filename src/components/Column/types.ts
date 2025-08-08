import type { CardType, ColumnsId } from "../../types/board";

export interface ColumnProps {
  id: ColumnsId;
  title: string;
  cards: CardType[];
}
