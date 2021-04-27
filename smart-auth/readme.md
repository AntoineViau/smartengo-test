# Smart-Auth

This micro-service is dedicated to user creation and authentication.  

## Install

    npm install

## Configuration

In `env` folder, dev.env:

    DB_TYPE=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=password
    DB_DATABASE=smartauth
    DB_SYNCHRONIZE=true
    JWT_EXPIRATION=24h
    SECRET_JWT=dev-jwt-secret
    SECRET_PASSWORD_SALT=dev-password-salt

Or e2e.env:

    DB_TYPE=sqlite
    DB_DATABASE=:memory:
    DB_SYNCHRONIZE=true
    MASTER_USER=chuck@norris.com
    SECRET_JWT=test-jwt-secret
    SECRET_PASSWORD_SALT=test-password-salt
    JWT_EXPIRATION=1h

## Run

    npm start

## Test

    npm run test:e2e

These are integration/e2e tests against an in-memory Sqlite database.  
**TODO: unit test everything.**

## User creation

    POST /user

Expected body : JSON

    { email: "email@email.com", "password": "the_password", role: "USER" }

Role: `"USER"` or `"ADMIN"`.

The created user id is returned (JSON): 

    { id: number }


## User authentication (JWT)

    POST /user/login

Expected body : JSON

    { email: "email@email.com", "password": "the_password" }

A Json Web Token (JWT) is returned:

    { access_token: "................." }

