import { AVAILABLE_TAGS, TAG_COLOR_MAP, type TagKey } from "../../types/tags";
import type { TagPickerProps } from "./types";

export const TagPicker = ({ value = [], onChange }: TagPickerProps) => {
    const handleToggle = (key: TagKey) => {
        if (value.includes(key)) onChange(value.filter((t) => t !== key));
        else onChange([...value, key]);
    };


    return (
        <div className="flex gap-2 flex-wrap">
            {AVAILABLE_TAGS.map(({key, label}) => {
                const active = value.includes(key);
                return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => handleToggle(key)}
                        className={`text-sm px-3 py-1 rounded-md font-medium transition-colors duration-150 inline-flex items-center ${active 
                            ? `${TAG_COLOR_MAP[key]} border-transparent shadow-sm` 
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                        aria-pressed={active}
                    >
                        {label}
                    </button>
                )
            })}
        </div>
    )
}
