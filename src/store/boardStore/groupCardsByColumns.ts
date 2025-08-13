import { columnIdType, type CardType, type ColumnsId, type ColumnType } from "../../types/board";
import type { BoardState } from "./types";

export const groupCardsByColumns = (cards: CardType[]): BoardState => {
  const columnIds: ColumnsId[] = [columnIdType.todo, columnIdType.in_progress, columnIdType.done]; // список всех колонок
  const columns: ColumnType[] = columnIds.map((id) => ({
    id,
    title: id === columnIdType.todo ? "To Do" : id === columnIdType.in_progress ? "In Progress" : "Done",
    cards: cards.filter((card) => card.status === id)
  }));

  return columns;
};
