import { API_URL } from "../constants"
import type { CommentItem } from "../types/comments";

interface RemoveCommentParams {
    taskId: string,
    commentId: string,
    setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>,
    onClose: () => void
}
export const removeComment = async({
    taskId,
    commentId,
    setComments,
    onClose
}: RemoveCommentParams) => {
    try {
        const res = await fetch(`${API_URL}/api/comments/${taskId}/${commentId}`, {
            method: "DELETE",
            credentials: "include"
        })

        if(!res.ok) throw new Error ("Ошибка удаления комментария");

        const comments = await res.json();
        onClose()
        setComments(comments)
    } catch (err) {
        console.error("Ошибка ужадения комментария:", err)
    }
}
