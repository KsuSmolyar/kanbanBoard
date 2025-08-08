import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number) => {
    const [debounced, setDebounced] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebounced(value), delay);

        return () => clearTimeout(timeoutId)
    }, [value, delay])

    return debounced;
}
