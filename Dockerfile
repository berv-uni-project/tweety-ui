FROM node:alpine as build
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN IS_DOCKER=true npm run build

FROM nginx:stable-alpine as run
RUN mkdir /app
COPY --from=build /app/dist /app
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
