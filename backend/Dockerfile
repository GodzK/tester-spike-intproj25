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

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000
CMD ["/wait-for-it.sh", "db:3306", "--", "node", "server.js"]
