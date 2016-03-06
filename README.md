## Event Track

[![Codeship Status for rafaeljesus/event-track](https://codeship.com/projects/db5dd500-78d8-0133-a2b7-4ab273700aba/status?branch=master)](https://codeship.com/projects/118624)
[![Docker Image Size](https://img.shields.io/imagelayers/image-size/rafaeljesus/event-track/latest.svg)](https://hub.docker.com/r/rafaeljesus/event-track/)
[![Docker Image Pulls](https://img.shields.io/docker/pulls/rafaeljesus/event-track.svg)](https://hub.docker.com/r/rafaeljesus/event-track/)
[![NPM version](http://img.shields.io/npm/v/event-track.svg)](https://www.npmjs.org/package/event-track)
[![bitHound Overalll Score](https://www.bithound.io/github/rafaeljesus/event-track/badges/score.svg)](https://www.bithound.io/github/rafaeljesus/event-track)
[![bitHound Dependencies](https://www.bithound.io/github/rafaeljesus/event-track/badges/dependencies.svg)](https://www.bithound.io/github/rafaeljesus/event-track/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/rafaeljesus/event-track/badges/devDependencies.svg)](https://www.bithound.io/github/rafaeljesus/event-track/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/rafaeljesus/event-track/badges/code.svg)](https://www.bithound.io/github/rafaeljesus/event-track)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/rafaeljesus/event-track)

* Record any actions your system perform, along with any properties that describe the action.

## Installation
```bash
npm install -g event-track
```

## Running server
To start the serve execute:
```bash
npm run build && npm run serve
```

## Create a Event
`curl -X POST localhost:3000/events \`
`-d 'event=order_creted' \`
`-d 'status=completed'`


## Built with
- [nodejs](https://https://nodejs.org) Backend is a node-v.5.7.1.
- [micro](https://github.com/zeithq/micro) API is exposed by micro. Async HTTP microservices
- [Mongodb](https://www.mongodb.com) Mongodb as a data store.

## Docker
This repository has automated image builds on hub.docker.com.

Use [docker-mongodb](https://github.com/rafaeljesus/docker-mongodb) and run command described there

Finally  run:
```bash
$ docker-machine start default
$ eval $(docker-machine env default)
$ docker run -it -e "NODE_ENV=development" -v "$(pwd)":/data --link mongo:mongo -w /data -p 3000:3000 rafaeljesus/event-track
$ curl `docker-machine ip default`:3000
```

## Run a command in the container
```bash
$ docker exec -it image_id bash
```

## Contributing
- Fork it
- Create your feature branch (`git checkout -b my-new-feature`)
- Commit your changes (`git commit -am 'Add some feature'`)
- Push to the branch (`git push origin my-new-feature`)
- Create new Pull Request

### Maintaners

* [Rafael Jesus](https://github.com/rafaeljesus)
