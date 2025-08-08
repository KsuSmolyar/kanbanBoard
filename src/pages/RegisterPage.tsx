import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../store/authStore/context";
import { useState } from "react";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuthContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await register(name, email, password);
            navigate("/");
        } catch (err) {
            setError((err as Error).message || "Ошибка регистрации");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>

                {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
                    {error}
                </div>
                )}

                <input
                    type="text"
                    placeholder="Имя"
                    className="border p-3 rounded w-full mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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
                    Зарегистрироваться
                </button>

                <p className="text-center text-sm mt-4">
                     Уже есть аккаунт?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Войти
                    </Link>
                </p>
            </form>
        </main>
    )
}
