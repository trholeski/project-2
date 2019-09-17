var db = require("../models");

module.exports = function(app) {
  // Get all TeamDatas
  app.get("/api/TeamDatas", function(req, res) {
    db.TeamData.findAll({}).then(function(dbTeamDatas) {
      res.json(dbTeamDatas);
    });
  });

  // Create a new TeamData
  app.post("/api/TeamDatas", function(req, res) {
    db.TeamData.create(req.body).then(function(dbTeamData) {
      res.json(dbTeamData);
    });
  });

  // Delete an TeamData by id
  app.delete("/api/TeamDatas/:id", function(req, res) {
    db.TeamData.destroy({ where: { id: req.params.id } }).then(function(dbTeamData) {
      res.json(dbTeamData);
    });
  });
};
