import { Droppable } from "@hello-pangea/dnd"
import type { ColumnProps } from "./types"
import { Card } from "../Card"
import { useMemo, useState } from "react";
import type { SortType } from "../../types/board";

export const Column = ({id, title, cards}:ColumnProps) => {
    const [sortType, setSortType] = useState<SortType>('created');

    const sortedCards = useMemo(() => {
        const cardsCopy = [...cards];
        switch (sortType) {
            case 'deadline':
                return cardsCopy.sort((a, b) => {
                if (!a.deadline) return 1;
                if (!b.deadline) return -1;
                return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                });
            case 'alphabet':
                return cardsCopy.sort((a, b) => a.title.localeCompare(b.title));
            case 'created':
            default:
                return cardsCopy; // оригинальный порядок — это порядок создания
        }
  }, [cards, sortType]);

    return (
        <div className="bg-gray-100 rounded w-full">
            <h2 className="sticky z-40 text-lg font-bold bg-gray-100 p-4 border-b-2" style={{ top: 122.5 }}>
                {title} <span className="text-gray-500">({cards.length})</span>
            </h2>
            <div className="flex gap-2 p-4 justify-center">
                <span>Сортировать</span>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value as SortType)}
                    className="text-sm border-gray-300 rounded px-2 py-1"
                >
                    <option value="created">По созданию</option>
                    <option value="deadline">По дедлайну</option>
                    <option value="alphabet">По алфавиту</option>
                </select>
            </div>
            <div className="p-4">
                <Droppable droppableId={id}>
                    {(provided)=> (
                        <div
                            className="min-h-[100px]"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {sortedCards.length === 0 ? (
                                <div className="flex flex-col items-center justify-center text-gray-500 p-6 text-sm gap-2">
                                    📎 Нет задач
                                </div>
                                ) : 
                                <div className="space-y-2">
                                    {sortedCards.map((card, index) => {
                                        return (
                                            <Card 
                                                key={card.id} 
                                                id={card.id} 
                                                index={index} 
                                                title={card.title}
                                                description={card.description}
                                                tags={card.tags}
                                                deadline={card.deadline}
                                                user_id={card.user_id}
                                            />
                                        )
                                    })}
                                </div>
                            }
                           
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
            
        </div>
    )
}
