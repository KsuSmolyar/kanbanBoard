import type { DropResult } from "@hello-pangea/dnd";
import type { CardType, ColumnsId, ColumnType } from "../../types/board";

export type BoardState = ColumnType[];

export const boardAction = {
    MOVE_CARD: "MOVE_CARD",
    ADD_CARD: "ADD_CARD",
    REMOVE_CARD: "REMOVE_CARD",
    EDIT_CARD: "EDIT_CARD",
    CHANGE_STATUS: "CHANGE_STATUS",
    MOVE_COLUMN: "MOVE_COLUMN"
} as const;

export type BoardAction = 
    { type: typeof boardAction.MOVE_CARD, payload: DropResult } |
    { type: typeof boardAction.ADD_CARD, payload: addActionPayload } |
    { type: typeof boardAction.EDIT_CARD, payload: CardType} |
    { type: typeof boardAction.CHANGE_STATUS, payload: changeStatusActionPayload } |
    { type: typeof boardAction.REMOVE_CARD, payload: string } |
    { type: typeof boardAction.MOVE_COLUMN, payload: {sourceIndex: number, destinationIndex: number}};

type addActionPayload = {
    card: CardType,
    listId: ColumnsId
}

export type changeStatusActionPayload = {
    sourceColumnId: ColumnsId,
    destinationColumnId: ColumnsId,
    taskId: string
}

export type BoardContextValue = {
    state: BoardState,
    actions: {
        moveCard: (result: DropResult) => void,
        addCard: (card: CardType, listId: ColumnsId) => void,
        removeCard: (cardId: string) => void,
        editCard: (card: CardType) => void,
        changeStatus: (data: changeStatusActionPayload) => void,
        moveColumn: (sourceIndex: number, destinationIndex: number) => void
    },
}
