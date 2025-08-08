import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string,
    label: string,
    isRow?: boolean,
}
