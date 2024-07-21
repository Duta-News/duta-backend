FROM node:18

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm install typescript -g
RUN npm install ts-node -g

ENV DATABASE_URL=value

COPY . .

RUN npm run db:generate

RUN tsc

CMD [ "npm", "run db:migrate && npm start" ]