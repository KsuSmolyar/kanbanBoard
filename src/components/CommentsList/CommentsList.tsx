import { useCommentsStore } from "../../store/commentsStore/context"
import { Comment } from "./Comment"

export const CommentsList = () => {
    const {store} = useCommentsStore();

    if(!store?.comments.length) {
        return <p>Пока нет комментариев</p>
    }

    return (
        <>
            <h2 className="mb-5">Комментарии</h2>
            <ul>
                {!!store?.comments.length && store.comments.map((comment) => {
                    return (
                        <li key={comment.id}>
                            <Comment author={comment.author} body={comment.body} id={comment.id}/>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
