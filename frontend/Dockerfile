FROM nginx:alpine

# คัดลอกไฟล์ frontend ทั้งหมดไปยัง nginx html directory
COPY . /usr/share/nginx/html

# คัดลอก config nginx (optional ถ้ามี)
# COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
