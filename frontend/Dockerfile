FROM nginx:alpine

# คัดลอก HTML ไปที่ path ที่ถูกต้อง
COPY ./index.html /usr/share/nginx/html/index.html
# คัดลอก config ไปแทนที่ default
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]