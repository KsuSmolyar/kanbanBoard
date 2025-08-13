import { API_URL } from "../../constants";
import type { CardType } from "../../types/board";

export const addCardToServer = async (card: Omit<CardType, "id">) => {
    try {
        const res = await fetch(`${API_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(card),
        });

        if (!res.ok) throw new Error("Ошибка при добавлении карточки на сервер");

        const savedCard: CardType = await res.json();
        return savedCard;
    } catch (err) {
        console.error(err);
        return null;
    }
};
