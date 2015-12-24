FROM node:5

ADD . /event-track

WORKDIR /event-track

RUN npm i --production

ENV NODE_ENV=production

CMD ["npm", "start"]
