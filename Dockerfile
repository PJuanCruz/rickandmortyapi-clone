FROM node:20.9.0-alpine3.18 as DEVELOPMENT

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20.9.0-alpine3.18 as PRODUCTION

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --only=production

COPY --from=DEVELOPMENT /usr/src/app/dist ./dist

CMD [ "node", "./dist/index.js" ]
