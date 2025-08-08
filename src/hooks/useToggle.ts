import { useCallback, useState } from "react"

interface UseToggleResult {
    value: boolean,
    setValue: (val: boolean) => void,
    toggle: () => void
}
export const useToggle = (initValue = false): UseToggleResult => {
    const [value, setValue] = useState(initValue);
    
    const toggle = useCallback(() => {
        setValue(prev => !prev)
    },[])

    return {value, toggle, setValue}
}
