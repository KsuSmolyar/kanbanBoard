import { useNavigate } from "react-router-dom";

export const BtnBack = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-600 underline"
        >
            ← Назад
        </button>
    )
}
