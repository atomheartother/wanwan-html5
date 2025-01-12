FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/mime.types /etc/nginx/mime.types
COPY ./public /usr/share/nginx/html
