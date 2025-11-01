FROM node:18
WORKDIR /app

# ติดตั้ง locale UTF-8
RUN apt-get update && \
    apt-get install -y locales && \
    sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen && \
    export LANG=en_US.UTF-8 && \
    export LC_ALL=en_US.UTF-8

RUN apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x wait-for-it.sh
EXPOSE 5000
CMD ["bash", "wait-for-it.sh", "db", "npm", "start"]
