import type { BoardState } from "../store/boardStore/types";

export function findCardById(board: BoardState, cardId: string) {
  for (const column of board) {
    const card = column.cards.find(c => c.id === cardId);
    if (card) {
      return { card, columnId: column.id };
    }
  }
  return null;
}
