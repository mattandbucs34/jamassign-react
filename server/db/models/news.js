'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  News.associate = function(models) {
    News.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return News;
};