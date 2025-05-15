# Сборка образа
docker build -t frontend-app .

# Запуск контейнера
docker run -d -p 80:80 --name frontend-container frontend-app

# Для production обычно используют docker-compose вместе с бэкендом
