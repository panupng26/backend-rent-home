FROM node:12-alpine

WORKDIR /usr/src/backend-rent-home

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]
