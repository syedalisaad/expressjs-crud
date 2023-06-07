var createError = require('http-errors');
const express = require('express');
const app = express();

const cors = require("cors");
var path = require('path');
var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection = require('./config/db.config');
var usersRouter = require('./routes/user.routes');
var authRouter = require('./routes/auth.routes');
const swaggerFile = require('./swagger_output.json')
const bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },

    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.routes.js"],
};


app.use(cors());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   cookie: { maxAge: 60000 },
//   store: new session.MemoryStore,
//   saveUninitialized: true,
//   resave: 'true',
//   secret: 'secret'
// }))
const specs = swaggerJsdoc(options);
app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true })
);

// app.use(flash());
app.use(usersRouter);
app.use( authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(3000);