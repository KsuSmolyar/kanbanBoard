import type { ButtonHTMLAttributes, ReactNode } from "react";

export type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: BtnVariantType,
    label: ReactNode,
    className?: string
}

export const btnVariants = {
    primary: "primary",
    secondary: "secondary",
    smallPrimary: "smallPrimary"
} as const;

export type BtnVariantType = keyof typeof btnVariants;
