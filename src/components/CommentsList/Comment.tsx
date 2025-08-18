// import type { IComment } from "../../store/commentsStore/types"
import { useState } from "react";
import type { CommentItem } from "../../types/comments";
import { Btn } from "../../UI/Btn";
import { btnVariants } from "../../UI/Btn/types";
import { Modal } from "../../UI/Modal";
import { RemoveNotification } from "../../UI/RemoveNotification";
import { useCommentsStore } from "../../store/commentsStore/context";
import { useAuthContext } from "../../store/authStore/context";
import { removeComment } from "../../utils/removeComment";
import { useParams } from "react-router-dom";

export const Comment = ({
    id,
    author_id,
    content,
    created_at,
    user_name,
    replied_comment_author,
    replied_comment_content
}: CommentItem) => {
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
    const {actions, setComments} = useCommentsStore();
    const { state } = useAuthContext();
    const currentUserId = state.user?.id;
    const { taskId } = useParams<{ taskId: string }>();

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setNotificationVisible(true)
    }

    const handleRemoveComment = () => {
        setIsRemoveSuccess(true);
        if(taskId) removeComment({taskId, commentId: id, setComments, onClose: () => {
            setNotificationVisible(false)
            setIsRemoveSuccess(false)
        }})
        
        
        // setTimeout(() => {
        // }, 1000)
    }

    return (
        <div 
            onClick={() => actions.addRepliedCommentAuthorAndId(user_name, id)}
            title="Ответить на комментарий"
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-left mb-3 relative hover:border-blue-500 transition-colors duration-200 cursor-pointer"
        >
            {replied_comment_author && replied_comment_content && (
                <div>
                    <span>{replied_comment_author}</span>
                    <p>{replied_comment_content}</p>
                </div>
            )}
            <header className="flex items-center gap-2">
                <div
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold"
                >
                    {user_name.charAt(0).toUpperCase()}
                </div>
                {user_name}
            </header>
            <div>{content}</div>
            <div>дата создания: {created_at}</div>
            {currentUserId === author_id && <Btn 
                label={"❌"}
                className="absolute top-2 right-2"
                title={"Удалить комментарий"}
                variant={btnVariants.smallPrimary}
                onClick={(e) => handleRemoveClick(e)}
            />}
            {isNotificationVisible && (
                <Modal onClose={() => setNotificationVisible(false)}>
                    <RemoveNotification
                        isSuccess={isRemoveSuccess}
                        handleRemove={handleRemoveComment}
                        onCancellation={() => setNotificationVisible(false)}
                        successMgs="Комментарий удален"
                        title="Вы уверены, что хотите удалить комментарий?"
                    />
                </Modal>
            )}
        </div>
    )
}
