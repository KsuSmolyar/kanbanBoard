import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd"
import type { ColumnsId, ColumnType } from "../../types/board";
import { Column } from "../Column";
import { useBoardContext } from "../../store/boardStore/context";
import type { IBoardProps } from "./types";
import { findCardById } from "../../utils/findCardById";
import { API_URL } from "../../constants";

export const Board = ({columns}: IBoardProps) => {
    const {state, actions} = useBoardContext();

    const onDragEnd = async(result: DropResult) => {
        const { source, destination, type, draggableId } = result;

        if (!destination) return;

        if (type === 'COLUMN') {
            actions.moveColumn(source.index, destination.index);
        }

        if (type === 'DEFAULT') {
            const found = findCardById(state, draggableId);
            if (!found) return;

            const { card } = found;

            const newStatus = destination.droppableId as ColumnsId;
            
            actions.moveCard(result); 
              // Отправляем изменения на сервер
            try {
                await fetch(`${API_URL}/api/tasks/${card.id}`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...card,
                            status: newStatus
                        })
                });
            } catch (err) {
                console.error('Ошибка при обновлении задачи:', err);
                // Можно откатить UI изменения, если сервер упал
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                {(provided) => (
                <div
                    className="grid gap-6"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {columns.map((column: ColumnType, index: number) => (
                        <Draggable draggableId={column.id} index={index} key={column.id}>
                            {(provided) => (
                            <div
                                className="flex flex-col"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Column
                                id={column.id}
                                title={column.title}
                                cards={column.cards}
                                />
                            </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
