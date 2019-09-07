'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "must be a valid email address"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member"
    }
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile'
    })
  };

  User.prototype.isAdmin = () => {
    return this.role === 'admin'
  };

  User.prototype.isCoordinator = () => {
    return this.role === 'coordinator'
  };

  return User;
};