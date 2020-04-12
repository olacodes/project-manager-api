"use strict";
module.exports = (sequelize, DataTypes) => {
  const GroupProject = sequelize.define(
    "GroupProject",
    {
      projectId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  GroupProject.associate = function (models) {
    // associations can be defined here
    GroupProject.belongsTo(models.User, { foreignKey: "userId", as: "User" });
    GroupProject.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "Project",
    });
  };
  return GroupProject;
};
