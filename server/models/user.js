'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "please enter your name"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        msg: "Invalid email address"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,10],
        msg: "Password must not be less than 3 characters"
      }
    }
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Tasks, {
      foreignKey: 'userId',
      as: 'tasks'
    })
  };
  return User;
};

