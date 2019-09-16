require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

//requiring elements needed for auth:

var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
// var env = require('dotenv').load()
var app = express();

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// For Passport - allowing express to manage logged in state:
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
 
//models being used for auth - to be imported into project db
var models = require("./app/models");

// var db = require("./models"); was variable name used previous to auth integration

var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.set('views', './app/views');
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app, passport);
// require('./app/routes/auth.js')(app,passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


    //how i synced the models and handled errors:
// models.sequelize.sync().then(function() {
//     console.log('Nice! Database looks fine')
// }).catch(function(err) {
//     console.log(err, "Something went wrong with the Database Update!")
// });
// app.listen(8080, function(err) {
//     if (!err){
//         console.log("Site is live on local host 8080");
//     }else{
//          console.log(err)
//     }
// });


// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
