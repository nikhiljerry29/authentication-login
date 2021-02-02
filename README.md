# Login Page Authentication With Encryption

This is user authentication application using Node.js, Express, Passport, Mongoose, EJS and using bcrypt encryption.

## Usage

Create ".env" file and add your MongoDB URI - local or Atlas (MONGOURI), salting variable (SALTROUNDS) and secret string for pasport (SECRET)

```sh
$ npm install
# Installing the application
```

```sh
$ node app.js
# Or run with Nodemon
$ nodemon app.js
```

Default Port :: [8080](http://localhost:8080)