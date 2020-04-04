'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupProject = sequelize.define('GroupProject', {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  GroupProject.associate = function(models) {
    // associations can be defined here
  };
  return GroupProject;
};