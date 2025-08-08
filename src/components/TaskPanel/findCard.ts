import type { BoardState } from "../../store/boardStore/types";
import type { CardType } from "../../types/board";

export const findCard = (state: BoardState, taskId: string) => {
    let found: CardType | undefined;
    for (const col of state) {
        const card = col.cards.find((c) => c.id === taskId);
        if (card) {
            found = card;
            break;
        }
    }
    return found;
}
