FROM node:alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD ["yarn", "start:prod"]