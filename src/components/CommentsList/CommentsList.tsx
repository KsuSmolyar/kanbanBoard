import { useParams } from "react-router-dom";
import { useCommentsStore } from "../../store/commentsStore/context"
import { Comment } from "./Comment"

export const CommentsList = () => {
    const {store} = useCommentsStore();
    const { taskId } = useParams<{ taskId: string }>();

    if(taskId && (!store?.comments[taskId] || store.comments[taskId].length === 0)) {
        return <p>Пока нет комментариев</p>
    }

    return (
        <>
            <h2 className="mb-5">Комментарии</h2>
            <ul>
                {taskId && (store?.comments[taskId] && store?.comments[taskId].length !== 0) && store.comments[taskId].map((comment) => {
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
