#!/bin/sh
set -e
#
cd /opt/prod/www/home_frontend

if [ -n "$HOME_FRONTEND_URL" ]; then
    sed -i "s@{{\s*HOME_FRONTEND_URL\s*}}@$HOME_FRONTEND_URL@g" static/js/*.js
    sed -i "s@{{\s*HOME_FRONTEND_URL\s*}}@$HOME_FRONTEND_URL@g" static/js/*.js.map
fi
if [ -n "$HOME_BACKEND_URL" ]; then
    sed -i "s@{{\s*HOME_BACKEND_URL\s*}}@$HOME_BACKEND_URL@g" /etc/nginx/conf.d/home_nginx.conf
fi
###############
exec "$@"
