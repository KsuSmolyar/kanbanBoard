import { useState } from "react"
import { Btn } from "../../UI/Btn"
import { btnVariants } from "../../UI/Btn/types"
import type { ICommentCardProps } from "./types"
import { Modal } from "../../UI/Modal"
import { RemoveNotification } from "../../UI/RemoveNotification"
import { useCommentsStore } from "../../store/commentsStore/context"

export const CommentCard = ({
    originalId,
    replyId,
    author,
    commentBody,
    className
}: ICommentCardProps) => {
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
    const {actions} = useCommentsStore();

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setNotificationVisible(true)
    }

    const handleRemoveComment = () => {
        setIsRemoveSuccess(true);

        setTimeout(() => {
            if(replyId) {
                actions.removeRepliedComment(originalId,  replyId);
                return;
            } else {
                actions.removeComment(originalId)
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
            <header className="underline"><span>Автор: </span>{author}</header>
            <div>{commentBody}</div>
            <Btn 
                label={"❌"}
                className="absolute top-2 right-2"
                title={"Удалить комментарий"}
                variant={btnVariants.smallPrimary}
                onClick={(e) => handleRemoveClick(e)}
            />
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
