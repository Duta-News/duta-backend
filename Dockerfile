FROM node:18

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm install typescript -g
RUN npm install ts-node -g

COPY . .

RUN npm run db:generate
RUN npm run db:migrate

RUN tsc

CMD [ "node", "dist/main.js" ]