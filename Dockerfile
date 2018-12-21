FROM node:alpine as build
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN IS_DOCKER=true npm run build

FROM nginx:stable-alpine as run
COPY --from=build /app/dist /usr/share/nginx/html
