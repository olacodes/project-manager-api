'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: 'todo'
    }
  }, {});
  
  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return Task;
};