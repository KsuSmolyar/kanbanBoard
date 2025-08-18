import type { BoardState } from "../store/boardStore/types";
import type { CardType } from "./board";
import type { CommentItem } from "./comments";

export const socketActionsType = {
    task_created: "task_created",
    task_updated: "task_updated",
    task_deleted: "task_deleted",
    comment_created: "comment_created",
    comment_deleted: "comment_deleted"
} as const;

// export type SocketActionsType = keyof typeof socketActionsType;

export type SocketMessage = 
{ type: typeof socketActionsType.task_created, payload: CardType } |
{ type: typeof socketActionsType.task_updated, payload: BoardState } |
{ type: typeof socketActionsType.task_deleted, payload: CardType } |
{ type: typeof socketActionsType.comment_created, payload: CommentItem[]} |
{ type: typeof socketActionsType.comment_deleted, payload: CommentItem[]};
