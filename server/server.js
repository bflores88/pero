"use-strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
const PORT = process.env.EXPRESS_HOST_PORT;

const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient(process.env.REDIS_URL);
const bcrypt = require("bcryptjs");
const User = require("./database/models/User");

const auth = require("./routes/auth");
const users = require("./routes/users");
const roles = require("./routes/roles");
const accounts = require("./routes/accounts");
const categories = require("./routes/categories");
const subcategories = require("./routes/subcategories");
const budgets = require("./routes/budgets");
const sharedBudgets = require("./routes/sharedBudgets");
const ledger = require("./routes/ledger");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// app.use(express.static("public"));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

redisClient.on("connect", function() {
  console.log("Redis client connected");
});

redisClient.on("error", function(err) {
  console.log("Something went wrong " + err);
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(function(username, password, done) {
    console.log("Validating with localStrategy");

    return new User({ username: username })
      .fetch()
      .then(data => {
        let user = data.toJSON();

        if (user === null) {
          return done(null, false, {
            message: "Bad username or password. Try again!"
          });
        }

        bcrypt.compare(password, user.password).then(match => {
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Bad username or password. Try again!"
            });
          }
        });
      })
      .catch(err => {
        console.error(err);
        return done(err);
      });
  })
);

passport.serializeUser(function(user, done) {
  console.log("serializing");
  return done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function(user, done) {
  console.log("deserializing");
  // console.log(user);

  return new User({ id: user.id }).fetch().then(user => {
    user = user.toJSON();
    done(null, {
      // gets additional info. attatches this object to every request as req.user.
      id: user.id,
      role_id: user.role_id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
  });
});

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/roles", roles);
app.use("/api/accounts", accounts);
app.use("/api/categories", categories);
app.use("/api/subcategories", subcategories);
app.use("/api/budgets", budgets);
app.use("/api/sharedbudgets", sharedBudgets);
app.use("/api/ledger", ledger);

app.get("/", (req, res) => {
  res.status(200).send("smoke test");
});

app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});
