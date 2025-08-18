import { API_URL } from "../constants";
import type { CommentItem } from "../types/comments";

interface AddCommentParams {
    taskId: string, 
    commentBody: string, 
    repliedCommentId?: string, 
    setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
}
export const addComment = async({
    taskId, commentBody, repliedCommentId, setComments
}: AddCommentParams) => {
    try {
        const res = await fetch(`${API_URL}/api/comments/${taskId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({content: commentBody, repliedCommentId}),
        })

        if(!res.ok) throw new Error("Ошибка при сохранении комментария");

        const comments = await res.json();
        setComments(comments)
    } catch(err) {
        console.error("Ошибка при сохранении комментария", err)
    }
}
