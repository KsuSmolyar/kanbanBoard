import { API_URL } from "../constants"

interface RemoveTaskParams {
    taskId: string,
}
export const removeTask = async({taskId}: RemoveTaskParams) => {
    try {
        const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
            method: "DELETE",
            credentials: "include"
        })

        if (!res.ok) throw new Error("Ошибка при удалении задачи");
    } catch (err) {
        console.error("Ошибка при удалении задачи: ", err)
    }
}
