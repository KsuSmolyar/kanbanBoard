import { createContext, useContext } from "react";
import type { BoardContextValue, BoardState } from "./types";
import { columnIdType } from "../../types/board";

export const initialBoard: BoardState = [
  {
    id: columnIdType.todo,
    title: "To Do",
    cards: [
      { id: "1", content: "Task 1", tags: [] },
      { id: "2", content: "Task 2", tags: [] },
    ],
  },
  {
    id: columnIdType.in_progress,
    title: "In Progress",
    cards: [{ id: "3", content: "Task 3", tags: [] }],
  },
  {
    id: columnIdType.done,
    title: "Done",
    cards: [{ id: "4", content: "Task 4", tags: [] }],
  },
];

export const BoardContext = createContext<BoardContextValue | null>(null);

export const useBoardContext = () => {
    const ctx = useContext(BoardContext);

    if(!ctx) throw new Error(`useBoardContext использовать совместно с BoardContext`);

    return ctx;
}
