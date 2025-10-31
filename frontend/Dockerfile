FROM nginx:alpine

# Copy HTML เข้า container
COPY ./index.html /usr/share/nginx/html/index.html

# Copy nginx config
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]