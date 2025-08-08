export interface IRemoveNotificationProps {
    isSuccess: boolean,
    onCancellation: () => void,
    handleRemove: () => void,
    successMgs: string,
    title: string
}
