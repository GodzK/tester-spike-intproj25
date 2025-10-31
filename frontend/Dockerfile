FROM nginx:alpine

# Copy HTML เข้า container
COPY . /usr/share/nginx/html

# Copy nginx config
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
