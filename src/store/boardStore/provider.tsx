import { useEffect, useReducer, type ReactNode } from "react";
import { boardAction, type BoardAction, type BoardState } from "./types";
import { BoardContext, initialBoard } from "./context";
import type { DropResult } from "@hello-pangea/dnd";
import { type CardType, type ColumnsId } from "../../types/board";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { API_URL, BOARD_STATE_KEY } from "../../constants";
import { groupCardsByColumns } from "./groupCardsByColumns";

const boardReducer = (state: BoardState, action: BoardAction) => {
    switch (action.type) {
        case boardAction.MOVE_CARD: {
            const { source, destination } = action.payload;
            if (!destination) return state;

            const sourceColIndex = state.findIndex((col) => col.id === source.droppableId);
            const destColIndex = state.findIndex((col) => col.id === destination.droppableId);

            const sourceCol = state[sourceColIndex];
            const destCol = state[destColIndex];

            const sourceCards = Array.from(sourceCol.cards);
            const [movedCard] = sourceCards.splice(source.index, 1);

            if (sourceColIndex === destColIndex) {
                // внутри одной колонки
                sourceCards.splice(destination.index, 0, movedCard);
                const newState = [...state];
                newState[sourceColIndex] = { ...sourceCol, cards: sourceCards };
                return newState;
            } else {
                // между колонками
                const destCards = Array.from(destCol.cards);
                destCards.splice(destination.index, 0, movedCard);

                const newState = [...state];
                newState[sourceColIndex] = { ...sourceCol, cards: sourceCards };
                newState[destColIndex] = { ...destCol, cards: destCards };
                return newState;
            }
        }
        case boardAction.ADD_CARD: {
            const { card, listId } = action.payload;
            const newState = state.map((col) => (
                    col.id === listId 
                    ? {...col, cards: [...col.cards, {...card, tags: card.tags ?? [], status: listId}]}
                    : col
                ))
            return newState
        }
        case boardAction.EDIT_CARD: {
            const editedCard = action.payload;
            const newState = state.map((col) => {
                const newCards = col.cards.map(card => (
                    card.id === editedCard.id ? {...card, ...editedCard} : card)
                );
                return { ...col, cards: newCards };
            })
            return newState
        }
        case boardAction.CHANGE_STATUS: {
            const {sourceColumnId, destinationColumnId, taskId} = action.payload;

            const sourceCol = state.find(col => col.id === sourceColumnId);
            if (!sourceCol) return state; // ничего не делаем, если нет source

            const taskToMove = sourceCol.cards.find(card => card.id === taskId);
            if (!taskToMove) return state;

            const newState = state.map((col) => {
                if (col.id === sourceColumnId) {
                    return {
                        ...col,
                        cards: col.cards.filter(card => card.id !== taskId)
                    };
                }

                if (col.id === destinationColumnId) {
                    return {
                        ...col,
                        cards: [...col.cards, {...taskToMove, status: destinationColumnId}]
                    };
                }

                return col;
            })

            return newState
        }
        case boardAction.REMOVE_CARD: {
            const taskId = action.payload;
            const newState = state.map((col) => {
                return {
                    ...col,
                    cards: col.cards.filter((card) => card.id !== taskId)
                }
            })
            return newState
        }
        case boardAction.MOVE_COLUMN: {
            const { sourceIndex, destinationIndex } = action.payload;
            const newState = [...state];
            const [movedColumn] = newState.splice(sourceIndex, 1);
            newState.splice(destinationIndex, 0, movedColumn);
            return newState;
        }
        case boardAction.INIT: {
            return action.payload
        }
        default:
            return state
    }
}


export const BoardProvider = ({children}: {children: ReactNode}) => {
    const [savedState, setSavedState] = useLocalStorage(BOARD_STATE_KEY,initialBoard)
    const [state, dispatch] = useReducer(boardReducer, savedState);

    const actions = {
        moveCard: (result: DropResult) => dispatch({type: boardAction.MOVE_CARD, payload: result}),
        addCard: (card: CardType, listId: ColumnsId) => dispatch({type: boardAction.ADD_CARD, payload: {card, listId}}),
        removeCard: (cardId: string) => dispatch({type: boardAction.REMOVE_CARD, payload: cardId}),
        editCard: (card: CardType) => dispatch({ type: boardAction.EDIT_CARD, payload: card }),
        changeStatus: (data: {sourceColumnId: ColumnsId, destinationColumnId: ColumnsId, taskId: string}) => dispatch({
            type: boardAction.CHANGE_STATUS, payload: data
        }),
        moveColumn: (sourceIndex: number, destinationIndex: number) => dispatch({
            type: boardAction.MOVE_COLUMN, payload: {sourceIndex, destinationIndex}
        })
    }

    useEffect(() => {
        const loadTasks = async() => {
            try{
                const res = await fetch(`${API_URL}/api/tasks`, { credentials: "include" });
                 if (!res.ok) throw new Error("Ошибка загрузки задач");

                 const tasks:CardType[] = await res.json();

                 // группируем по колонкам
                const columns = groupCardsByColumns(tasks);

                 dispatch({ type: boardAction.INIT, payload: columns });

            } catch(err) {
                console.error("Ошибка при загрузке задач: ",err)
            }
        }

        loadTasks();
    },[])

    useEffect(() => {
        setSavedState(state)
    },[state, setSavedState])

    return (
        <BoardContext.Provider value={{state, actions}}>
            {children}
        </BoardContext.Provider>
    )
}
