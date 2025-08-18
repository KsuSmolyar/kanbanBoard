import { API_URL } from "../constants";
import { groupCardsByColumns } from "../store/boardStore/groupCardsByColumns";
import type { BoardState } from "../store/boardStore/types";

export const loadTasks = async(dispatchAction: (columns: BoardState) => void) => {
    try{
        const res = await fetch(`${API_URL}/api/tasks`, { credentials: "include" });
        if (!res.ok) throw new Error("Ошибка загрузки задач");

        const tasks:BoardState = await res.json();

                 // группируем по колонкам
        const columns = groupCardsByColumns(tasks);
        dispatchAction(columns);
    } catch(err) {
        console.error("Ошибка при загрузке задач: ",err)
    }
}
