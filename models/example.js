module.exports = function(sequelize, DataTypes) {
  var TeamData = sequelize.define("TeamData", {
    teamName: DataTypes.STRING,
    teamDescription: DataTypes.TEXT,
  });
  return TeamData;
};
