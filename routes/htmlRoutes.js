var db = require("../models");

module.exports = function(app) {
  // Load Team List page
  app.get("/", function(req, res) {
    db.TeamData.findAll({}).then(function(dbTeamDatas) {
      // Render the page to handlebars (teamList.handlebars)
      res.render("teamList", {
        msg: "Welcome!",
        teamData: dbTeamDatas
      });
    });
  });

  // Load Team Lobby page and pass in an team by id
  app.get("/teamData/:id", function(req, res) {
    db.TeamData.findOne({ where: { id: req.params.id } }).then(function(
      dbTeamData
    ) {
      // Render the page to handlebars (teamLobby.handlebars)
      res.render("teamLobby", {
        teamData: dbTeamData
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
