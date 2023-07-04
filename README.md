# CV API

REST API built with NestJS for serving data for my [CV App](https://github.com/WeceW/cv).

See [Swagger Docs](https://toni-weckroth-api-v2.onrender.com/api). (Please note that it might take up to 3 minutes for API to wake up)

## Getting started

- Clone this repository
- Run `yarn` to install dependencies
- Set `.env` variables (see `.env.example`)
  Start DB `yarn db:up` (docker-compose)
- Run `yarn start:dev` to start app
- Start developing

## Built with

- [NestJS](https://docs.nestjs.com/)
- TypeORM

## Good to know

- Most of the routes are protected and require authentication.
- Besides serving data, API composes some simple analytics based on events data is receives from clients.

## Deploy (to render.com)

Push to branch `master`
