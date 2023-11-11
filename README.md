## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

docker run --name gsbd -p 5432:5432 -e POSTGRES_USER={user} -e POSTGRES_PASSWORD={password} -e POSTGRES_DB=gsbd -d postgres:16
