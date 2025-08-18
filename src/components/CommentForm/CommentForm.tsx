import { useEffect, useRef, useState } from "react"
import { Btn } from "../../UI/Btn"
import { btnVariants } from "../../UI/Btn/types"
import { Input } from "../../UI/Input"
import { Textarea } from "../../UI/Textarea"
import { useCommentsStore } from "../../store/commentsStore/context";
import { useAuthContext } from "../../store/authStore/context"
import { useParams } from "react-router-dom"
import { addComment } from "../../utils/addComment"

export const CommentForm = () => {
    const { state } = useAuthContext();
    const [name, setName] = useState(state.user?.name || "");
    const [commentBody, setCommentBody] = useState("");
    const {store, actions, setComments} = useCommentsStore();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const { taskId } = useParams<{ taskId: string }>();

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentBody(e.target.value);

        if(e.target.value === "" && store?.repliedCommentAuthor) {
            actions.removeRepliedCommentAuthor()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(taskId) {
            if(store?.repliedCommentId) {
                addComment({taskId, commentBody, repliedCommentId: store.repliedCommentId, setComments})
                actions.removeRepliedCommentId()
                actions.removeRepliedCommentAuthor()
            } else {
                addComment({taskId, commentBody, setComments})
            }
        }

        setName("");
        setCommentBody("");
    }

    useEffect(() => {
        if (!store || !taskId || !store.repliedCommentAuthor) return;

        const authorName = store.repliedCommentAuthor;

        if (authorName) {
            setCommentBody(`@${authorName} `);
        }

        textareaRef?.current?.focus();
    }, [store, taskId, store?.repliedCommentAuthor]);

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
            <Btn label="Добавить" type="submit" variant={btnVariants.primary} disabled={!commentBody.length || !name.length}/>
        </form>
    )
}
