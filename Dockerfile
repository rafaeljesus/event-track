FROM node:5

ADD . /event-track

WORKDIR /event-track

RUN npm i

CMD ["npm", "start"]
