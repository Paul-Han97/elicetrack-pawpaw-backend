FROM node:20.18.0 AS development

WORKDIR /usr/src/app

COPY package*.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]