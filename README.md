# jsn-superheroes

## How to Run

1. Create and fill all .env files. These files are:

- apps/client/.env
- apps/server/.env

You should use .env.example folder as a reference.

2. Open terminal in root foder.

3. Install dependencies: `npm install`.

4. Run database by installing postgres server on your computer.

5. Run app: `npm run dev`

## Global

### Technologies

1. [Typescript](https://www.typescriptlang.org/)
2. [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces)
3. [turborepo](https://turbo.build/repo/docs)

## Client

### Technologies

1. [React](https://react.dev/)
2. [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/)

### Folder Structure

1. assets - static assets (images, global styles)
2. libs - shared libraries and utilities

   1. components - plain react components

   2. enums

   3. exceptions

   4. hooks

   5. packages - separate features or functionalities

   6. types

3. packages - separate app features or functionalities
4. pages - app pages
5. slices - redux slices

## Server

### Technologies

1. [NestJS](https://docs.nestjs.com/)
2. [TypeORM](https://typeorm.io/)

### Folder Structure

1. libs - shared libraries and utilities

   1. enums

   2. packages - separate features or functionalities

   3. types

2. packages - separate app features or functionalities

## Shared Package

### Folder Structure

1. libs - shared libraries and utilities

   1. enums

   2. types

2. packages - separate app features or functionalities
