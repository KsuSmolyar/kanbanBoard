import { useState } from "react";
import { Btn } from "../../UI/Btn"
import { btnVariants } from "../../UI/Btn/types"
import { TaskPanel } from "../TaskPanel/TaskPanel";
import { Modal } from "../../UI/Modal";
import type { IToolbarProps } from "./types";
import classNames from "classnames";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Toolbar = ({children}: IToolbarProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFilters, setShowFilters] = useLocalStorage("isFiltersOpen",false);

    return (
        <div className="w-full sticky z-50 " style={{ top: 52 }}>
            {/* Верхняя панель с кнопками */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border">
                <Btn 
                    label={"Добавить задачу"}
                    variant={btnVariants.primary}
                    onClick={() => setIsModalOpen(true)}
                />
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                    {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                </button>
            </div>
            {isModalOpen && 
                <Modal onClose={() => setIsModalOpen(false)}>
                    <TaskPanel 
                        onSuccess={() => setIsModalOpen(false)}
                        successMsg="✅ Задача добавлена"
                        buttonLabel="Добавить"
                    />
                </Modal>
            }
            {/* Блок фильтров */}
            <div
                className={classNames(
                "transition-all duration-300 overflow-hidden",
                showFilters ? "max-h-[1000px] mt-4" : "max-h-0"
                )}
            >
                <div className={classNames(showFilters ? "opacity-100" : "opacity-0", "transition-opacity duration-300")}>
                    {children}
                </div>
            </div>
   
        </div>
    )
}
