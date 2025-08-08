import classNames from "classnames"
import type { TextareaProps } from "./types"
import { forwardRef, memo } from "react"

export const Textarea = memo(forwardRef<HTMLTextAreaElement, TextareaProps> (({
    className,
    label,
    id,
    name,
    placeholder,
    value,
    onChange,
    rows,
    isRow = false,
    ...props
}, ref) => {
    return (
        <label className={classNames(className,  isRow ? "grid grid-cols-4 gap-3 items-start" : "flex flex-col gap-2", "w-full")}>
            <span className={classNames("font-medium text-left",  isRow ? "col-span-1 whitespace-nowrap" : "")}>{label}</span>
            <textarea
                ref={ref}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={classNames("border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-full",
                    isRow ? "col-span-3" : ""
                )}
                rows={rows}
                {...props}
            />
        </label>
    )
}))
