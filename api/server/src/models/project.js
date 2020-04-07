'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "please enter the project name"
        }
      },
    },

    projectDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Only user can create project"
        }
      }
    },
  }, {});

  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User, {
      through: models.GroupProject,
      as: "users",
      foreignKey: "projectId"
    })

    Project.hasMany(models.Task, {
      foreignKey: "projectId",
      as: "tasks",
    })

  };
  return Project;
};
