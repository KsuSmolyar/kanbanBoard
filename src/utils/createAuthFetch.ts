import { API_URL } from "../constants";

export const createAuthFetch = (logout: () => void) => {
  // Функция обновления токена
  const refreshToken = async () => {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    console.log("res from refreshToken", res)
    if (!res.ok) {
      throw new Error("Refresh token failed");
    }
    return res.json(); // можно вернуть данные пользователя
  };

  return async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    let res = await fetch(input, {
      ...init,
      credentials: "include", // всегда включаем куки
    });
    console.log("res from return createAuthFetch", res)
    if (res.status === 401) {
      // Попытка обновить токен
      try {
        await refreshToken();

        // Повторяем исходный запрос после обновления токена
        res = await fetch(input, {
          ...init,
          credentials: "include",
        });
        return res;
      } catch (err) {
        // Если рефреш не удался — логаутим пользователя
        logout();
        throw err;
      }
    }

    return res;
  };
};
