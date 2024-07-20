FROM node:12.18.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm install typescript -g

COPY . .

CMD [ "node", "dist/main.js" ]