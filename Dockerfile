FROM node:5

ADD . /event-track

WORKDIR /event-track

RUN npm i --production

CMD ["npm", "start"]
