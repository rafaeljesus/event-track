## Event Track

[ ![Codeship Status for rafaeljesus/event-track](https://codeship.com/projects/db5dd500-78d8-0133-a2b7-4ab273700aba/status?branch=master)](https://codeship.com/projects/118624) [![bitHound Overalll Score](https://www.bithound.io/github/rafaeljesus/event-track/badges/score.svg)](https://www.bithound.io/github/rafaeljesus/event-track) [![bitHound Dependencies](https://www.bithound.io/github/rafaeljesus/event-track/badges/dependencies.svg)](https://www.bithound.io/github/rafaeljesus/event-track/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/rafaeljesus/event-track/badges/devDependencies.svg)](https://www.bithound.io/github/rafaeljesus/event-track/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/rafaeljesus/event-track/badges/code.svg)](https://www.bithound.io/github/rafaeljesus/event-track)

* Record any actions your system perform, along with any properties that describe the action.

## Installation
```bash
npm install -g event-track
```

## Running tests
To run a suite tests execute:
```bash
npm test
```

## Built with
- [nodejs](https://https://nodejs.org) Backend is a node-v.5.3.0.
- [koa](http://koajs.com) API is a KOA app. It respond to requests RESTfully in JSON.
- [Mongodb](https://www.mongodb.com) Mongodb as a data store.

## Docker
This repository has automated image builds on hub.docker.com. So you can also
run:
```
$ docker-machine start default
$ eval $(docker-machine env default)
$ docker run -it -p 3000:80 rafaeljesus/event-track
```

## API documentation
We use source code comments to add documentation.

You can browse an HTML documenation at `/apidoc/index.html`

## Contributing
- Fork it
- Create your feature branch (`git checkout -b my-new-feature`)
- Commit your changes (`git commit -am 'Add some feature'`)
- Push to the branch (`git push origin my-new-feature`)
- Create new Pull Request

### Maintaners

* [Rafael Jesus](https://github.com/rafaeljesus)
