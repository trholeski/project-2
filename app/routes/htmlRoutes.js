var db = require("../models");
var authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {
    // Load Team List page
    app.get("/", isLoggedIn, function (req, res) {
        console.log('in app.get/');
        db.TeamData.findAll({}).then(function (dbTeamDatas) {
            console.log('in teamdata.findall');
            // Render the page to handlebars (teamList.handlebars)
            res.render("teamList", {
                msg: "Welcome!",
                teamData: dbTeamDatas
            });
        });
    });

    // Load Team Lobby page and pass in an team by id
    app.get("/teamData/:id", function (req, res) {
        db.TeamData.findOne({ where: { id: req.params.id } }).then(function (dbTeamData) {
            // Render the page to handlebars (teamLobby.handlebars)
            res.render("teamLobby", {
                teamData: dbTeamData,
            });
        });
    });

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup'
    }
    ));

    // app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/signin'
    }));

    //routing for players page
    app.get("/teamData/teamData/:player", function (req, res) {
        // db.TeamData.findOne({ where: { player: req.user.firstname } })
        res.render('players');
        
    }
)

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
}

