"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "please enter your username"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Enter a valid email address"
          }
        }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: "password must not be less than 3 characters"
          }
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      foreignKey: "userId",
      as: "tasks"
    });
  };
  return User;
};
