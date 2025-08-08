import { Draggable } from "@hello-pangea/dnd"
import { useNavigate } from "react-router-dom";
import { formatDateReadable, isDueToday, isOverdue } from "../../utils/date";
import { AVAILABLE_TAGS, TAG_COLOR_MAP } from "../../types/tags";
import type { CardProps } from "./types";

export const Card = ({ 
    id, 
    index, 
    content, 
    description,
    deadline,
    tags = []
}: CardProps) => {
    const navigate = useNavigate();

    const overdue = isOverdue(deadline);
    const dueToday = !overdue && isDueToday(deadline);

    const handleClick = () => {
        navigate(`/task/${id}`);
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div 
                    className={`bg-white rounded-lg p-3 mb-3 shadow hover:shadow-md transition border border-transparent hover:border-blue-500 
                        ${overdue ? "border-2 border-red-500" : "border border-transparent"}
                        cursor-pointer`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    title="Подробнее"
                    onClick={handleClick}
                >
                    <div className="font-medium mb-2">{content}</div>

                    {tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-2">
                        {tags.map((t) => (
                            <span key={t} className={`text-xs px-2 py-1 rounded-full border ${TAG_COLOR_MAP[t]}`}>
                                {AVAILABLE_TAGS.find(a => a.key === t)?.label ?? t}
                            </span>
                        ))}
                        </div>
                    )}

                    {description && description.trim() !== "" && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                            {description}
                        </p>
                    )}

                                {/* Индикатор дедлайна */}
                    {deadline && (
                        <div className="ml-3 flex flex-col items-end">
                            {overdue ? (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Просрочено</span>
                            ) : dueToday ? (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Сегодня</span>
                            ) : (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                                    {formatDateReadable(deadline)}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    )
}
