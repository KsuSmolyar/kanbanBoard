import { useEffect, useState } from "react"
import { useBoardContext } from "../../store/boardStore/context";
import { columnIdType, type CardType} from "../../types/board";
// import { v4 as uuidv4 } from "uuid";
import { Btn } from "../../UI/Btn";
import { taskPanelTypes, type TaskPanelProps } from "./types";
import { Input } from "../../UI/Input";
import { Textarea } from "../../UI/Textarea";
import { TagPicker } from "../TagPicker";
import { findCard } from "./findCard";
import type { TagKey } from "../../types/tags";
import { addCardToServer } from "../../store/boardStore/addCardToServer";
import { saveCardToServer } from "../../store/boardStore/saveCardToServer";

export const TaskPanel = ({
    onSuccess, 
    successMsg,
    buttonLabel,
    type = taskPanelTypes.add,
    taskId,
    taskTitle="",
    taskDescription="",
    taskDeadline
}: TaskPanelProps) => {
    const [task, setTask] = useState(taskTitle);
    const [description, setDescription] = useState(taskDescription);
    const [successMessage, setSuccessMessage] = useState(false);
    const [tags, setTags] = useState<TagKey[]>( []);
    const {state, actions} = useBoardContext();
    const [deadline, setDeadline] = useState<string | null>(taskDeadline ?? null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!task.trim()) return;

        let cardId;

        if (type === taskPanelTypes.edit && taskId) {
            cardId = taskId
        }

        const newCard: Omit<CardType, "id"> = {
            title: task,
            description: description.trim(),
            tags,
            deadline: deadline ?? null,
            status: columnIdType.todo,
        }

        const editedCard: CardType = {
            id: cardId!,
            title: task,
            description: description.trim(),
            tags,
            deadline: deadline ?? null,
            status: columnIdType.todo,
        }

        if(type === taskPanelTypes.add) {
            // actions.addCard(newCard, columnIdType.todo);
            // setTask("");
            // setDescription("");
            // setTags([]);

            addCardToServer(newCard).then((savedCard) => {
                if (savedCard) {
                    actions.addCard(savedCard, columnIdType.todo); // добавляем в локальный state
                    setTask("");
                    setDescription("");
                    setTags([]);
                    setDeadline(null);

                    setSuccessMessage(true);
        
                    setTimeout(() => {
                        setSuccessMessage(false);
                        onSuccess?.()
                    }, 2000)
                } else {
                    // можно показать ошибку пользователю
                    alert("Не удалось сохранить карточку на сервере");
                }
            });
        }

        if (type === taskPanelTypes.edit && taskId) {
             saveCardToServer(editedCard).then((savedCard) => {
                if (savedCard) {
                    actions.editCard(savedCard);
                    setSuccessMessage(true);
        
                    setTimeout(() => {
                        setSuccessMessage(false);
                        onSuccess?.()
                    }, 2000)
                } else {
                    // можно показать ошибку пользователю
                    alert("Не удалось сохранить карточку на сервере");
                }
            });
            // actions.editCard(newCard)
        }
        
        // setSuccessMessage(true);
        
        // setTimeout(() => {
        //     setSuccessMessage(false);
        //     onSuccess?.()
        // }, 2000)
    }

    useEffect(() => {
        if (type === taskPanelTypes.edit && taskId && state) {
            const found = findCard(state, taskId);

            if (found) {
                setTask(found.title ?? "");
                setDescription(found.description ?? "");
                setTags(found.tags ?? []);
                setDeadline(found.deadline ?? "")
            } else {
                // Если карточка не найдена — можно очистить или оставить существующие значения
                setTags([]);
            }
        }

        // Если переключаемся в режим добавления — очищаем поля
        if (type === taskPanelTypes.add) {
            setTask("");
            setDescription("");
            setTags([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId, type, state]);

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 w-full">
            {successMessage ? (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
                    {successMsg}
                </div>
            ) :
                <>
                    <Input 
                        label="Заголовок"
                        type="text"
                        id="taskInput"
                        name="taskInput"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Введите заголовок"
                        validationType={"text"}
                        required={true}
                    />
                    <Textarea 
                        label="Описание"
                        id="taskDescription"
                        name="taskDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Добавьте описание"
                        rows={3}
                    />
                     <div>
                        <label className="block mb-2 font-medium">Метки</label>
                        <TagPicker value={tags} onChange={setTags} />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="deadline" className="mb-1 font-medium">Дедлайн</label>
                        <input
                            id="deadline"
                            type="date"
                            value={deadline ?? ""}
                            onChange={(e) => setDeadline(e.target.value || null)}
                            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">Оставьте пустым, если дедлайн не нужен</p>
                    </div>
            
                    <Btn 
                        label={buttonLabel}
                        disabled={!task.trim()}
                        type="submit"
                    />
                </>
        }
            
        </form>
    )
}
