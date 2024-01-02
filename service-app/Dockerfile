FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY ./prisma ./prisma/

COPY . .

RUN npm postinstall

EXPOSE 3000

CMD ["npm", "start"]
