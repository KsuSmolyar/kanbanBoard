import { useEffect, useState } from "react";
import type { FilterBarProps } from "./types"
import { TagPicker } from "../TagPicker";
import { useDebounce } from "../../hooks/useDebounce";
import type { TagKey } from "../../types/tags";

export const FilterBar  = ({
    onChange,
}: FilterBarProps) => {
    const [query, setQuery] = useState("");
    const [tags, setTags] = useState<TagKey[]>( []);
    const [from, setFrom] = useState<string | null>(  null);
    const [to, setTo] = useState<string | null>( null);
    const [onlyOverdue, setOnlyOverdue] = useState<boolean>( false);

    const debouncedQuery = useDebounce<string>(query, 250);

    const handleReset = () => {
        setQuery("");
        setTags([]);
        setFrom(null);
        setTo(null);
        setOnlyOverdue(false);

        onChange({});
    };

    useEffect(() => {
        const newFilters = {
            query: debouncedQuery.trim() ? debouncedQuery.trim() : undefined,
            tags: tags.length ? tags : undefined,
            from: from ?? undefined,
            to: to ?? undefined,
            onlyOverdue: onlyOverdue || undefined,
        };

        onChange(newFilters);
  }, [debouncedQuery, tags, from, to, onlyOverdue, onChange]);

    return (
       <div className="bg-gray-300 p-4 rounded-lg shadow-md flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between xl:space-x-6">
            {/* Поиск */}
            <div className="flex-1">
                <input
                type="search"
                placeholder="Поиск по заголовку..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Фильтры */}
            <div className="flex flex-wrap gap-4 xl:items-start justify-between">
                {/* Метки */}
                <div className="flex flex-col min-w-[120px]">
                    <label className="text-sm font-medium mb-1">Метки</label>
                    <TagPicker value={tags} onChange={setTags} />
                </div>

                {/* Дата: С */}
                <div className="flex flex-col min-w-[120px]">
                    <label className="text-sm font-medium mb-1">С</label>
                    <input
                        type="date"
                        value={from ?? ""}
                        onChange={(e) => setFrom(e.target.value || null)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                </div>

                {/* Дата: По */}
                <div className="flex flex-col min-w-[120px]">
                    <label className="text-sm font-medium mb-1">По</label>
                    <input
                        type="date"
                        value={to ?? ""}
                        onChange={(e) => setTo(e.target.value || null)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                </div>

                {/* Только просроченные */}
                <div className="flex flex-col items-center mt-1 min-w-[160px]">
                    <div className="flex">
                        <input
                            id="onlyOverdue"
                            type="checkbox"
                            checked={onlyOverdue}
                            onChange={(e) => setOnlyOverdue(e.target.checked)}
                            className="h-4 w-4 text-red-600 border-gray-300 rounded"
                        />
                        <label htmlFor="onlyOverdue" className="text-sm ml-2">Только просроченные</label>
                    </div>
                    
                    <button
                        onClick={handleReset}
                        className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            </div>
        </div>
    )
}
