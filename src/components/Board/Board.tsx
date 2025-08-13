import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd"
import type { ColumnType } from "../../types/board";
import { Column } from "../Column";
import { useBoardContext } from "../../store/boardStore/context";
import type { IBoardProps } from "./types";

export const Board = ({columns}: IBoardProps) => {
    const {actions} = useBoardContext();

    const onDragEnd = (result: DropResult) => {
        const { source, destination, type } = result;

        if (!destination) return;

        if (type === 'COLUMN') {
            actions.moveColumn(source.index, destination.index); // ✅ добавим эту функцию в контекст
        }

        if (type === 'DEFAULT') {
            actions.moveCard(result); 
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
            
            {/* <div className="w-full">
                <div
                    className="grid gap-6"
                    style={{
                    gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                    }}
                >
                    {columns.map((column: ColumnType) => {
                        return (
                            <Column 
                                key={column.id} 
                                id={column.id} 
                                title={column.title} 
                                cards={column.cards}
                            />
                        )
                    })}
                </div>

            </div> */}
        </DragDropContext>
    )
}
