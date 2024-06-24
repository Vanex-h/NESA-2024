const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Post;