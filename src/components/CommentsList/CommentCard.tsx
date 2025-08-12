import { useState } from "react"
import { Btn } from "../../UI/Btn"
import { btnVariants } from "../../UI/Btn/types"
import type { ICommentCardProps } from "./types"
import { Modal } from "../../UI/Modal"
import { RemoveNotification } from "../../UI/RemoveNotification"
import { useCommentsStore } from "../../store/commentsStore/context"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../store/authStore/context"

export const CommentCard = ({
    originalId,
    replyId,
    author,
    authorId,
    commentBody,
    className
}: ICommentCardProps) => {
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
    const {actions} = useCommentsStore();
    const { taskId } = useParams<{ taskId: string }>();
    const { state } = useAuthContext();
    const currentUserId = state.user?.id;

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setNotificationVisible(true)
    }

    const handleRemoveComment = () => {
        setIsRemoveSuccess(true);

        setTimeout(() => {
            if(replyId && taskId) {
                actions.removeRepliedComment(originalId,  replyId, taskId);
                return;
            } else if(taskId) {
                actions.removeComment(originalId, taskId)
            }
            setNotificationVisible(false)
            setIsRemoveSuccess(false)
        }, 2000)
    }

    const handleReplyClick = () => {
        if(replyId) {
            actions.addRepliedCommentId({repliedId: replyId, originalId: originalId})
            return;
        } else {
            actions.addRepliedCommentId(originalId);
        }
    }

    return (
        <div 
            onClick={handleReplyClick}
            title="Ответить на комментарий"
            className={className}
        >
            <header className="flex items-center gap-2">
                <div
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold"
                >
                    {author.charAt(0).toUpperCase()}
                </div>
                {author}
            </header>
            <div>{commentBody}</div>
            {currentUserId === authorId && <Btn 
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
