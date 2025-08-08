import classNames from "classnames"
import { btnVariants, type BtnProps } from "./types"
import styles from "./Btn.module.css"

export const Btn = ({
    label,
    variant,
    className,
    onClick,
    type,
    disabled,
    ...props
}: BtnProps) => {
    return (
        <button 
            className={classNames(styles.btn, className, "bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition self-end", {
                [styles.primary]: variant === btnVariants.primary,
                [styles.secondary]: variant === btnVariants.secondary,
                [styles.smallPrimary]: variant === btnVariants.smallPrimary
            })}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            {label}
        </button>
    )
}
