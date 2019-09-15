module.exports = function(sequelize, DataTypes) {
  var TeamData = sequelize.define("TeamData", {
    teamName: DataTypes.STRING,
    teamDescription: DataTypes.TEXT,
    member1: DataTypes.TEXT,
    member2: DataTypes.TEXT,
    member3: DataTypes.TEXT,
    member4: DataTypes.TEXT,
    member5: DataTypes.TEXT,
    member6: DataTypes.TEXT
  });
  return TeamData;
};
