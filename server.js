const express = require("express");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const app = express();
const db = require("./models");
const thingsController = require("./controllers/thingsController");
const usersController = require("./controllers/userController");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", "handlebars");

// VIEWS ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.use(thingsController);
app.use(usersController);

// API ROUTES
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});
// db.sequelize.sync({force: true}).then(function () {
db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
