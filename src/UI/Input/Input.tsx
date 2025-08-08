import classNames from "classnames"
import type { InputProps } from "./types"
import { useCallback, useState } from "react";

export const Input = ({
    placeholder,
    name,
    type,
    onChange,
    id,
    value,
    className,
    label,
    required,
    minLength,
    maxLength,
    validationType,
    isRow = false,
    ...props
}: InputProps) => {
    const [error, setError] = useState<string | null>(null);

    const validate = useCallback((val: string) => {
        if(required && val.trim() === "") {
            return "Поле обязательно"
        } 

        if(minLength && val.trim().length < minLength) {
            return `Минимум ${minLength} символов`
        }

        if(maxLength && val.trim().length > maxLength) {
            return `Максимум ${maxLength} символов`;
        }

        if(validationType === "email") {
            const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegexp.test(val)) {
                return "Неверный формат email";
            }
        }
        return null

    },[required, minLength, maxLength, validationType])

    const handleBlur = () => {
        const errorMsg = validate(value);
        setError(errorMsg)
    }

    return (
        <label className={classNames(  isRow ? "grid grid-cols-4 gap-3 items-start" : "flex flex-col gap-2", className)}>
            <span className={classNames("font-medium text-left", isRow ? "col-span-1 whitespace-nowrap" : "")}>{label}</span>
            <input
                placeholder={placeholder}
                name={name}
                type={type}
                onChange={onChange}
                id={id}
                value={value}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                onBlur={handleBlur}
                className={classNames("flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none",
                    isRow ? "col-span-3" : ""
                )}
                {...props}
            />
            {!!error && <p className={"validatedInput__error"}>{error}</p>}
        </label>
    )
}
