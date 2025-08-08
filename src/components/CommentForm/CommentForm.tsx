import { useEffect, useRef, useState } from "react"
import { Btn } from "../../UI/Btn"
import { btnVariants } from "../../UI/Btn/types"
import { Input } from "../../UI/Input"
import { Textarea } from "../../UI/Textarea"
import { useCommentsStore } from "../../store/commentsStore/context";
import { v4 as uuidv4 } from "uuid";
import type { IComment } from "../../store/commentsStore/types"

export const CommentForm = () => {
    const [name, setName] = useState("");
    const [commentBody, setCommentBody] = useState("");
    const {store, actions} = useCommentsStore();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentBody(e.target.value);
        console.log("handleCommentChange", e.target.value)

        if(e.target.value === "" && store?.repliedCommentId) {
            console.log("e.target.value", e.target.value)
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
            body: commentBody
        }

        if(store?.repliedCommentId) {
            actions.addRepliedCommentData(newComment)
        } else {
            actions.addComment(newComment);
        }

        setName("");
        setCommentBody("");
    }

    useEffect(() => {
        if(store?.repliedCommentId) {
            if(typeof store?.repliedCommentId === "string") {
                const commentIndex = store.comments.findIndex((comment) => comment.id === store.repliedCommentId);
                setCommentBody(`@${store.comments[commentIndex].author}` + " ");
            } else if(store?.repliedCommentData) {
                const {repliedId, originalId} = store.repliedCommentId;
                const commentsArr = store?.repliedCommentData[originalId];
                const commentIndex = commentsArr.findIndex((comment) => (
                    comment.id === repliedId))
                setCommentBody(`@${store.repliedCommentData[originalId][commentIndex].author}` + " ");
            }
           

            if(textareaRef?.current) {
                textareaRef.current.focus()
            }
        }
    },[store?.repliedCommentId, store?.comments, store?.repliedCommentData])

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
