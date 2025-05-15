# Этап сборки (build stage)
FROM node:18-alpine as build

WORKDIR /app  # Рабочая директория в контейнере
COPY package*.json ./  # Копируем файлы зависимостей
RUN npm install  # Устанавливаем зависимости
COPY . .  # Копируем остальные файлы проекта
RUN npm run build  # Собираем production-версию приложения

# Этап production
FROM nginx:alpine

# Копируем собранные файлы из этапа build
COPY --from=build /app/build /usr/share/nginx/html
# Копируем нашу конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80  # Открываем порт 80
CMD ["nginx", "-g", "daemon off;"]  # Запускаем Nginx
