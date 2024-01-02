# Base image
FROM node:20
RUN npx prisma generate
EXPOSE 3001
CMD [ "npm", "run", "start:prod" ]
