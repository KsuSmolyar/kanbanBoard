# Kanban Board App

Полноценное канбан-приложение с аутентификацией и возможностью работы с задачами.  
Бэкенд — на **Express + PostgreSQL**, фронтенд — на **React**. Деплой осуществляется через **Render**.

---

## 🚀 Возможности

- Регистрация и авторизация пользователей
- Хранение JWT в **httpOnly cookie** для безопасной авторизации
- Создание, редактирование и удаление задач
- Задачи доступны всем пользователям
- Поддержка drag-and-drop с помощью [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd)
- Реалтайм-обновления через **WebSocket**
- Защита от XSS и CSRF (куки `httpOnly`, `secure`, `sameSite=none`)

---

## 🛠️ Технологии

- **Frontend:** React, TypeScript, Vite, @hello-pangea/dnd  
- **Backend:** Node.js, Express, PostgreSQL, JWT  
- **Auth:** httpOnly cookies  
- **WebSocket:** wss (через пакет `ws`)  
- **Deployment:** Render  

---

## ⚠️ Важное ограничение

Приложение **корректно работает только в Google Chrome**.  
Причина: браузеры вроде **Яндекс, Safari, Firefox** по умолчанию блокируют *third-party cookies* (куки с другого домена).  

- При деплое на **разные домены** (например, фронт — `myapp-frontend.onrender.com`, бэк — `kanban-auth-server.onrender.com`) куки могут не сохраняться.  
- Chrome пока поддерживает такой сценарий, но другие браузеры блокируют куки, и авторизация не будет работать.  
