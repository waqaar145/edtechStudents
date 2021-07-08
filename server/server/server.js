const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const usersRoutes = require("./../routes/users");
var session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("./../db/knex");
const uuid = require("uuid/v4");
const passport = require("passport");
const config = require("./../config/config");
const cors = require("cors");
var morgan = require("morgan");
const discussionNsp = require("./../socket/namespaces/Discussion/index");
const contentNsp = require("./../socket/namespaces/Content/index");

var app = express();
const io = (app.io = require("socket.io")());

app.use(
  cors({
    origin: ["http://localhost:4000"],
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//
// sesstion
module.exports.store = store = new KnexSessionStore({
  knex: knex,
  tablename: "sessions", // optional. Defaults to 'sessions'
});
//
app.use(
  session({
    genid: (req) => {
      return uuid(); // use UUIDs for session IDs
    },
    name: "edtechToken",
    store: store,
    secret: config.SESSTION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("./../config/passport-local");

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "./../uploads/top-level"));

// all apis
usersRoutes.routes(app);

// handling 404
app.get("*", function (req, res) {
  res.status(404).send("404");
});

discussionNsp.createNamespace(io);
contentNsp.createNamespace(io);

module.exports = app;
