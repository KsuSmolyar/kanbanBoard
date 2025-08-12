import { useEffect, useRef, useState } from "react"
import { Btn } from "../../UI/Btn"
import { btnVariants } from "../../UI/Btn/types"
import { Input } from "../../UI/Input"
import { Textarea } from "../../UI/Textarea"
import { useCommentsStore } from "../../store/commentsStore/context";
import { v4 as uuidv4 } from "uuid";
import type { IComment } from "../../store/commentsStore/types"
import { useAuthContext } from "../../store/authStore/context"
import { useParams } from "react-router-dom"

export const CommentForm = () => {
    const { state } = useAuthContext();
    const [name, setName] = useState(state.user?.name || "");
    const [commentBody, setCommentBody] = useState("");
    const {store, actions} = useCommentsStore();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const { taskId } = useParams<{ taskId: string }>();
    const authorId = state.user?.id ?? "";

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentBody(e.target.value);

        if(e.target.value === "" && store?.repliedCommentId) {
            actions.removeRepliedCommentId()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!commentBody.length) {
            alert("Введите комментарий")
        }

        const newComment: IComment = {
            id: uuidv4(),
            author: name,
            body: commentBody,
            authorId
        }

        if(store?.repliedCommentId && taskId) {
            actions.addRepliedCommentData(newComment, taskId)
        } else if(taskId) {
            actions.addComment(newComment, taskId);
        }

        setName("");
        setCommentBody("");
    }

    useEffect(() => {
        if (!store || !taskId || !store.repliedCommentId) return;

        let authorName = "";

        if (typeof store.repliedCommentId === "string") {
            // Ответ на корневой комментарий
            const comment = store.comments[taskId]?.find(c => c.id === store.repliedCommentId);
            if (comment) {
                authorName = comment.author;
            }
        } else {
            // Ответ на вложенный комментарий
            const { originalId, repliedId } = store.repliedCommentId;

            const originalComment = store.comments[taskId]?.find(c => c.id === originalId);
            if (originalComment?.repliedCommentData) {
                const reply = originalComment.repliedCommentData.find(r => r.id === repliedId);
                if (reply) {
                    authorName = reply.author;
                }
            }
        }

        if (authorName) {
            setCommentBody(`@${authorName} `);
        }

        textareaRef?.current?.focus();
    }, [store, taskId, store?.repliedCommentId]);

    useEffect(() => {
        const userName = state.user?.name;

        if(userName) {
            setName(userName)
        }
    }, [state.user?.name])

    useEffect(() => {
        textareaRef.current?.focus()
    },[])

    return (
        <form 
            onSubmit={handleSubmit}
            className="mb-4 w-full max-w-xl mx-auto bg-white p-4 rounded-xl shadow-md space-y-2"
        >
            <Input 
                type={"text"}
                label="Ваше имя"
                placeholder="Введите имя"
                value={name}
                validationType={"text"}
                required={true}
                minLength={3}
                isRow={true}
                onChange={(e) => setName(e.target.value)}
            />
            <Textarea
                ref={textareaRef}
                label="Комментарий"
                placeholder="Введите текст"
                rows={3}
                value={commentBody}
                isRow={true}
                onChange={handleCommentChange}
            />
            <Btn label="Добавить" type="submit" variant={btnVariants.primary}/>
        </form>
    )
}
