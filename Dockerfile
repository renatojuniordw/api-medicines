# FROM --platform=linux/amd64 node:16.20-alpine3.16 as api-interchangeable-medicines

# WORKDIR /usr/app
# COPY package.json /usr/app/
# COPY .env /usr/app/

# RUN npm install --legacy-peer-deps

# COPY . .
# EXPOSE 3000
# CMD [ "npm" ,"start" ]


#build stage
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

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3000

CMD [ "node", "dist/main.js" ]