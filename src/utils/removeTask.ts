import { API_URL } from "../constants"
import { groupCardsByColumns } from "../store/boardStore/groupCardsByColumns";
import { type BoardState } from "../store/boardStore/types";
import type { CardType } from "../types/board";

interface RemoveTaskParams {
    taskId: string,
    dispatchAction: (columns: BoardState) => void
}
export const removeTask = async({taskId, dispatchAction}: RemoveTaskParams) => {
    try {
        const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
            method: "DELETE",
            credentials: "include"
        })

        if (!res.ok) throw new Error("Ошибка при удалении задачи");

        const tasks:CardType[] = await res.json();
        // группируем по колонкам
        const columns: BoardState = groupCardsByColumns(tasks);
        dispatchAction(columns)
    } catch (err) {
        console.error("Ошибка при удалении задачи: ", err)
    }
}
