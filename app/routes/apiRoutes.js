var db = require("../models");

module.exports = function (app) {
  // Get all TeamDatas
  app.get("/api/TeamDatas", function (req, res) {
    db.TeamData.findAll({}).then(function (dbTeamDatas) {
      res.json(dbTeamDatas);
    });
  });

  //NOT TESTED
  // Displays a single user, or returns false
      // app.get("/api/TeamDatas/:id", function (req, res) {
      //   var chosen = req.params.character;

      //   console.log(chosen);

      //   for (var i = 0; i < characters.length; i++) {
      //     if (chosen === characters[i].routeName) {
      //       return res.json(characters[i]);
      //     }
      //   }

      //   return res.json(false);
      // });


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

  app.get("/api/userData/:id", function (req, res) {
    db.TeamData.findOne({ where: { id: req.params.id } }).then(function (dbTeamData) {
      // console.log(dbTeamData);
      // console.log(currentUser;);
      var id = dbTeamData.dataValues.id;
      var member1 = dbTeamData.dataValues.member1;
      var member2 = dbTeamData.dataValues.member2;
      var member3 = dbTeamData.dataValues.member3;
      var member4 = dbTeamData.dataValues.member4;
      var member5 = dbTeamData.dataValues.member5;
      var member6 = dbTeamData.dataValues.member6;
      var currentUser = req.user.firstname;

      if (member1 === null) {
        dbTeamData.update({
          member1: currentUser
        }, { where: id }).then(function (res) {
          console.log(res);
        });
      } else if (member2 === null) {
        if (currentUser === member1) {
          console.log("Player already on the team");
        } else {
          dbTeamData.update({
            member2: currentUser
          }, { where: id }).then(function (res) {
            console.log(res);
          });
        }
      } else if (member3 === null) {
        if (currentUser === member1 || member2) {
          console.log("Player already on the team");
        } else {
          dbTeamData.update({
            member3: currentUser
          }, { where: id }).then(function (res) {
            console.log(res);
          });
        }
      } else if (member4 === null) {
        if (currentUser === member1 || member2 || member3) {
          console.log("Player already on the team");
        } else {
          dbTeamData.update({
            member4: currentUser
          }, { where: id }).then(function (res) {
            console.log(res);
          });
        }
      } else if (member5 === null) {
        if (currentUser === member1 || member2 || member3 || member4) {
          console.log("Player already on the team");
        } else {
          dbTeamData.update({
            member5: currentUser
          }, { where: id }).then(function (res) {
            console.log(res);
          });
        }
      } else if (member6 === null) {
        if (currentUser === member1 || member2 || member3 || member4 || member5) {
          console.log("Player already on the team");
        } else {
          dbTeamData.update({
            member6: currentUser
          }, { where: id }).then(function (res) {
            console.log(res);
          });
        }
      } else {
        console.log("Team is Full");
      }
    });
  });
}