FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x wait-for-it.sh

EXPOSE 5000

CMD ["bash", "wait-for-it.sh", "db", "npm", "start"]
