import { useCallback, useMemo, useState } from "react";
import { useBoardContext } from "../../store/boardStore/context";
import { Board } from "../Board/Board"
import { FilterBar } from "../FilterBar"
import type { TasksFilter } from "../../types/filters";
import { isInRange, isOverdue } from "../../utils/date";
import { Toolbar } from "../Toolbar";

export const BoardWithFilters = () => {
    const { state } = useBoardContext();
   
    const [filters, setFilters] = useState<TasksFilter>({});

    const handleFilterChange = useCallback((f: TasksFilter) => {
        setFilters(f);
    }, [setFilters]);


    const filteredColumns = useMemo(() => {
        if (!state) return [];

        const queryVal = filters.query?.toLowerCase();

        return state.map((col) => {
            const filteredCards = col.cards.filter((card) => {
                // text filter (search by title)
                if (queryVal && !card.content.toLowerCase().includes(queryVal)) return false;

                // tags: if filter specified, card must contain at least one selected tag
                if (filters.tags && filters.tags.length > 0) {
                    if (!card.tags || !card.tags.some((t) => filters.tags!.includes(t))) return false;
                }

                // overdue filter
                if (filters.onlyOverdue) {
                    if (!isOverdue(card.deadline)) return false;
                }

                // date range filter (from..to) — if either set, require card.deadline in range
                if ((filters.from || filters.to) && !isInRange(card.deadline, filters.from ?? null, filters.to ?? null)) {
                    return false;
                }

                return true;
            })

            return { ...col, cards: filteredCards };
        })

    },[state, filters])

    return (
        <div className="space-y-4">
            <Toolbar>
                <FilterBar onChange={handleFilterChange}/>
            </Toolbar>
                <Board columns={filteredColumns}/>
        </div>
    )
}
