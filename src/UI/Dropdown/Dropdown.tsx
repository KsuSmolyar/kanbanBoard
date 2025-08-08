import type { IDropdownProps } from "./types";
import { useToggle } from "../../hooks/useToggle";
import { useEffect, useRef, useState } from "react";

export const Dropdown = <T,>({
    options,
    onChange,
    value,
    placeholder="select..."
}: IDropdownProps<T>) => {
    const {value: isOpen, toggle, setValue: setIsOpen} = useToggle(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find(option => option.value === value);

    const handleOptionClick = (index: number) => {
        onChange(options[index].value);
        setIsOpen(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch(e.key) {
            case "ArrowDown": {
                e.preventDefault();
                setIsOpen(true);
                setHighlightedIndex(prev => (prev + 1) % options.length);
                break;
            }
            case "ArrowUp": {
                e.preventDefault();
                setIsOpen(true);
                setHighlightedIndex(prev => (prev - 1 + options.length) % options.length);
                break;
            }
            case "Enter": {
                if(isOpen && highlightedIndex >= 0) {
                    onChange(options[highlightedIndex].value)
                    setIsOpen(false)
                } else {
                    setIsOpen(true)
                }
                break;
            }

            case "Escape": {
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
            }
        }
    }

    //Закрытие при клике вне

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[setIsOpen])

    return (
        <div 
            className="relative w-64 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            tabIndex={0}
            ref={containerRef}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
            onKeyDown={handleKeyDown}
        >
            <div 
                className="px-3 py-2 cursor-pointer flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={toggle}
            >
                {selectedOption ? 
                    selectedOption.label : 
                    <span  className="text-gray-400">
                        {placeholder}
                    </span>
                }
                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && 
                (<ul 
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none"
                    role="listbox"
                >
                    {options.map(({label}, index) => {
                        return (
                            <li 
                                key={label}
                                id={`option-${index}`}
                                className={`px-3 py-2 cursor-pointer transition-colors ${
                                    index === highlightedIndex
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`}
                                role="option"
                                onClick={() => handleOptionClick(index)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                {label}
                            </li>
                        )
                    })}
                </ul>)
            }
       </div> 
    )
}
