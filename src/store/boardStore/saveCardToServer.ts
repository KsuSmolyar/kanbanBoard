import { API_URL } from "../../constants";
import type { CardType } from "../../types/board";

export const saveCardToServer = async (card: CardType) => {
    try {
        const res = await fetch(`${API_URL}/api/tasks/${card.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(card),
        });

        if (!res.ok) throw new Error("Ошибка при сохранении карточки на сервер");

        const savedCard: CardType = await res.json();
        return savedCard;
    } catch (err) {
        console.error(err);
        return null;
    }
};
