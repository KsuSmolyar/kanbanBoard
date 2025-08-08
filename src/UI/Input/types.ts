import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string,
    label: string,
    validationType?: "text" | "email",
    type: "text" | "email" | "password",
    value: string,
    isRow?: boolean
}
