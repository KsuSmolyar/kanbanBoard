import { useEffect, useState } from "react"

export const useLocalStorage = <T,>(key: string, initialValue: T) => {

    const initFn = () => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue
        } catch (err) {
            console.warn(`Возникла ошибка при чтении данных из LocalStorage по ключу ${key}: `, err);
            return initialValue;
        }

        
    }
    const [value, setValue] = useState<T>(initFn);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },[value, key])

    return [value, setValue] as const;
}
