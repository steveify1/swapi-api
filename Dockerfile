FROM node:14


WORKDIR '/app'

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 7000

RUN npm run build

CMD ["npm", "start"]