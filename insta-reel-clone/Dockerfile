FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4040

CMD ["npm","run","start"]