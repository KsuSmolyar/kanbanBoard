import { useNavigate, useParams } from "react-router-dom";
import { useBoardContext } from "../../store/boardStore/context";
import { Btn } from "../../UI/Btn";
import { useState } from "react";
import { Modal } from "../../UI/Modal";
import { TaskPanel } from "../TaskPanel/TaskPanel";
import { btnVariants } from "../../UI/Btn/types";
import { taskPanelTypes } from "../TaskPanel/types";
import { columnIdType, type ColumnsId } from "../../types/board";
import type { Option } from "../../UI/Dropdown/types";
import { Dropdown } from "../../UI/Dropdown";
import type { BoardState } from "../../store/boardStore/types";
import { formatDateReadable, isDueToday, isOverdue } from "../../utils/date";
import { RemoveNotification } from "../../UI/RemoveNotification";
import { useAuthContext } from "../../store/authStore/context";
import { removeTask } from "../../utils/removeTask";
import { API_URL } from "../../constants";

const options: Option<ColumnsId>[] = [
  { label: '📃 todo', value: columnIdType.todo },
  { label: '⚙️ inProgress', value: columnIdType.in_progress },
  { label: '✔️ done', value: columnIdType.done },
];

const findColumnIdWithTask = (s: BoardState, tId?: string): ColumnsId | null => {
        if (!tId) return null;
        for (const col of s) {
            if (col.cards.some(card => card.id === tId)) {
                return col.id as ColumnsId;
            }
        }
        return null;
    };

export const TaskDetail = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const { state, actions } = useBoardContext();
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
    const navigate = useNavigate();
    const { state: authState } = useAuthContext();
    const currentUserId = authState.user?.id;
    
    
    const [selected, setSelected] = useState<ColumnsId>(() => {
        const found = findColumnIdWithTask(state, taskId);
        return found ?? columnIdType.todo; 
    });

    let task = null;

    for (const col of state) {
        const found = col.cards.find((card) => card.id === taskId);
        if (found) {
            task = found;
            break;
        }
    }

    const taskUserId = task?.user_id;

    const handleChangeStatus = async (val: ColumnsId) => {
        setSelected(val);
        if(taskId) {
            actions.changeStatus({destinationColumnId: val, sourceColumnId: selected, taskId})
        }
        try {
           const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                ...task,
                status: val
                })
            });

            if (!res.ok) throw new Error("Ошибка при обновлении задачи");
        } catch (err) {
            console.error('Ошибка при обновлении задачи:', err);
            // Можно откатить UI изменения, если сервер упал
        }
    }

    const handleRemoveTask = () => {
        setIsRemoveSuccess(true);
        if(taskId) removeTask({taskId});

        setNotificationVisible(false)
            navigate(-1)
            setIsRemoveSuccess(false)
    }

    if (!task) {
        return <div className="p-8">Задача не найдена</div>;
    }
    
    return (
        <div className="border-b border-gray-600 mb-7 pb-6">
           {isEditVisible && (
                <Modal onClose={() => setIsEditVisible(false)}>
                    <TaskPanel 
                        onSuccess={() => setIsEditVisible(false)}
                        successMsg="✅ Задача обновлена"
                        buttonLabel="Сохранить"
                        taskTitle={task?.title}
                        taskDescription={task?.description}
                        taskId={taskId}
                        type={taskPanelTypes.edit}
                    />
                </Modal>
                )
            }
            <Dropdown options={options} onChange={(val) => handleChangeStatus(val)} value={selected} placeholder={"Статус"}/>
            <header className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
                {currentUserId && taskUserId && (currentUserId === taskUserId) && <div className="flex justify-between gap-1">
                    <Btn 
                        label={"✏️"}
                        title="Редактировать задачу"
                        variant={btnVariants.smallPrimary}
                        onClick={() => setIsEditVisible(true)}
                    />
                    <Btn 
                        label="🗑️"
                        title="Удалить задачу"
                        variant={btnVariants.smallPrimary}
                        onClick={() => setNotificationVisible(true)}
                    />
                </div>}
                
            </header>
            {task.deadline && (
                <div className="flex items-center gap-3">
                    <span 
                        className={`text-sm px-2 py-1 rounded ${isOverdue(task.deadline) ? "bg-red-100 text-red-700" : isDueToday(task.deadline) 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-gray-100 text-gray-700"}`
                        }
                    >
                        {isOverdue(task.deadline) 
                         ? "Просрочено" 
                         : isDueToday(task.deadline) 
                         ? "Сегодня" 
                         : formatDateReadable(task.deadline)}
                    </span>
                    <span className="text-sm text-gray-500">Дедлайн</span>
                </div>
            )}
            
            {task.description && <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{task.description}</p>} 

            {isNotificationVisible && (
                <Modal onClose={() => setNotificationVisible(false)}>
                    <RemoveNotification
                        isSuccess={isRemoveSuccess}
                        handleRemove={handleRemoveTask}
                        onCancellation={() => setNotificationVisible(false)}
                        successMgs="Задача удалена"
                        title="Вы уверены, что хотите удалить задачу?"
                    />
                </Modal>
            )}
        </div>
    )
}
