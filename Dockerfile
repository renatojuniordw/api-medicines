FROM  --platform=linux/amd64 node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


#prod stage
FROM  --platform=linux/amd64 node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install  --legacy-peer-deps --only=production

RUN rm package*.json

EXPOSE 3000

CMD [ "node", "dist/main.js" ]