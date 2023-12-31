## Docker

docker-compose docker-compose up --build
docker run --name gsbd -p 5432:5432 -e POSTGRES_USER={user} -e POSTGRES_PASSWORD={password} -e POSTGRES_DB=gsbd -d postgres:16
