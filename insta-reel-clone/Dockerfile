FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4040

# Set host and port for CRA to listen on all interfaces
ENV HOST=0.0.0.0
ENV PORT=4040

CMD ["npm","run","start"]