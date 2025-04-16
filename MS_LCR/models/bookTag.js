const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BookTag = sequelize.define('BookTag', {
  }, {
    tableName: 'BookTags'
  });
  
  return BookTag;
};
