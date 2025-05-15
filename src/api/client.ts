// src/api/client.ts
import axios from "axios";

// Базовый URL API (берется из переменных окружения)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

// Создаем экземпляр axios с базовыми настройками
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,  // Максимальное время ожидания ответа
  headers: {
    "Content-Type": "application/json",  // Тип содержимого по умолчанию
  },
});

// Добавляем перехватчик для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,  // Если ответ успешный - просто возвращаем его
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);  // Если ошибка - логируем и пробрасываем дальше
  }
);
