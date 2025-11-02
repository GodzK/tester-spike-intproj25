FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASS=pl1password
ENV DB_NAME=mydb
ENV LANG=C.UTF-8

EXPOSE 3000
CMD ["node", "server.js"]
