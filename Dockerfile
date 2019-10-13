FROM node:10
WORKDIR /task-managmenet-api

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY dist .

EXPOSE 3000

CMD yarn start
