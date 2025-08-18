import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../store/authStore/context";
import { useState } from "react";
// import { useBoardContext } from "../store/boardStore/context";
// import { loadTasks } from "../utils/loadTasks";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // const {actions} = useBoardContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            // loadTasks(actions.init)
            navigate("/");
        } catch (err) {
            setError((err as Error).message || "Ошибка входа");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
             <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>

                {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
                    {error}
                </div>
                )}

                <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded w-full mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <input
                type="password"
                placeholder="Пароль"
                className="border p-3 rounded w-full mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700"
                >
                Войти
                </button>

                <p className="text-center text-sm mt-4">
                Нет аккаунта?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Зарегистрироваться
                </Link>
                </p>
            </form>
        </main>
    )
}
