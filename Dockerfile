FROM reg.xiaoneng.cn/alpine/nginx:1.10
WORKDIR /src
RUN mkdir -p /opt/prod/www/home_frontend
COPY dist /opt/prod/www/home_frontend/
COPY home_nginx.conf /etc/nginx/conf.d/
COPY docker-entrypoint.sh /opt/
RUN rm -rf /src
ENTRYPOINT ["/bin/sh","/opt/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]


