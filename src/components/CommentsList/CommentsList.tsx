import { useParams } from "react-router-dom";
import { Comment } from "./Comment"
import { useEffect, useRef } from "react";
import { API_URL } from "../../constants";
import type { CommentItem } from "../../types/comments";
import { useCommentsStore } from "../../store/commentsStore/context";

export const CommentsList = () => {
    const {comments, setComments} = useCommentsStore();
    const { taskId } = useParams<{ taskId: string }>();
    const shouldRun = useRef(false);

    useEffect(() => {
        const loadComments = async() => {
            try {
                const res = await fetch(`${API_URL}/api/comments/${taskId}`, { credentials: "include" });
                if(!res.ok) throw new Error("Ошибка загрузки комментариев");

                const comments: CommentItem[] = await res.json();
                setComments(comments);
            } catch(err) {
                console.error("Ошибка при получении списка комментариев: ", err)
            }
        }

        if(shouldRun.current) return;
        shouldRun.current = true;

        loadComments()
    },[])

    if(taskId && !comments.length) {
        return <p>Пока нет комментариев</p>
    }

    return (
        <>
            <h2 className="mb-5">Комментарии</h2>
            <ul>
                {taskId && !!comments.length && comments.map((comment) => {
                    return (
                        <li key={comment.id}>
                            <Comment {...comment}/>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
