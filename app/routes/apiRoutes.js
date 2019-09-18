var db = require("../models");

module.exports = function (app) {
  // Get all TeamDatas
  app.get("/api/TeamDatas", function (req, res) {
    db.TeamData.findAll({}).then(function (dbTeamDatas) {
      res.json(dbTeamDatas);
    });
  });

  // Create a new TeamData
  app.post("/api/TeamDatas", function (req, res) {
    db.TeamData.create(req.body).then(function (dbTeamData) {
      res.json(dbTeamData);
    });
  });

  // Delete an TeamData by id
  app.delete("/api/TeamDatas/:id", function (req, res) {
    db.TeamData.destroy({ where: { id: req.params.id } }).then(function (dbTeamData) {
      res.json(dbTeamData);
    });
  });

  app.get("/api/userData/:id", function(req, res) {
    db.TeamData.findOne({ where: { id: req.params.id } }).then(function(dbTeamData) {
      console.log(dbTeamData);
      console.log(req.user.firstname);
      var id = dbTeamData.dataValues.id;
      dbTeamData.update({
        member1: req.user.firstname
      }, {where: id}).then(function (res) {
        console.log(res);
      });
    });
    });
}