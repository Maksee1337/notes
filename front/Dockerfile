FROM node:18.13.0

WORKDIR /app

COPY package.json ./
COPY vite.config.js ./
COPY yarn.lock ./
COPY .env.docker ./.env

COPY . .

RUN yarn
RUN yarn build
RUN yarn global add serve
