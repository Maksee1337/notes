FROM node:18.13.0

WORKDIR /app

COPY package.json ./
COPY .env.docker ./.env

RUN npm i -g @nestjs/cli
RUN npm install --production

COPY . .

RUN npm run build
