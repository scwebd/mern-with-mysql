const express = require("express");
const path = require("path");
const logger = require("morgan");
const port = process.env.port || 3001;
const app = express();

const { sequelize } = require("./models");
const userController = require("./controllers/userController");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// # serves up static assets (used when project is deployed)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// TODO: add middleware for your controller logic (routes) here!!!
app.use("/api/users", userController);

// # anything not captured by your routes above will be sent to the React front end
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// # while actively developing your models/tables, consider adding `{force: true}` into the parens of .sync() below... this drops and recreates your tables each time the server restarts, which makes it easy to test out changes to your columns and constrains; just make sure to turn it off once you get your table structure locked down!
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`API server now on 'http://localhost:${port}!`);
  });
});
