import { Btn } from "../Btn"
import type { IRemoveNotificationProps } from "./types"

export const RemoveNotification = ({
    isSuccess, 
    onCancellation,
    handleRemove,
    successMgs,
    title
}: IRemoveNotificationProps) => {
    return (
        <div>
        { isSuccess ? (
            <p>{successMgs}</p>
            ) :
            (
                <>
                    <p>{title}</p>
                        <Btn 
                            label="Подтвердить"
                            onClick={handleRemove}
                        />
                        <Btn 
                            label="Отменить"
                            onClick={onCancellation}
                        />
                </>
            )
        }
        </div>
    )
}
