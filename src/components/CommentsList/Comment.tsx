import type { IComment } from "../../store/commentsStore/types"
import { CommentCard } from "./CommentCard";

export const Comment = ({author, body, id, repliedCommentData, authorId}: IComment) => {
    
    return (
        <article 
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-left mb-3"
        >
            <CommentCard
                author={author}
                commentBody={body}
                className="relative mb-2 bg-gray-100 border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors duration-200 cursor-pointer"
                originalId={id}
                authorId={authorId}
            />
            {!!repliedCommentData?.length && <ul>
                {repliedCommentData.map((comment) => {
                    return (
                        <li key={comment.id} className="pl-5">
                            <CommentCard
                                author={comment.author}
                                commentBody={comment.body}
                                className="relative mb-1 bg-gray-200 border border-gray-400 rounded-lg p-3 text-sm hover:border-blue-500 transition-colors duration-200 cursor-pointer"
                                originalId={id}
                                replyId={comment.id}
                                authorId={authorId}
                            />
                        </li>
                    )
                })}
                </ul>}
        </article>
    )
}
