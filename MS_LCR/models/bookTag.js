const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BookTag = sequelize.define('BookTag', {
    // We don't need to manually define foreign key columns
    // Sequelize will add them automatically with the proper naming
  }, {
    tableName: 'BookTags'
  });
  
  return BookTag;
};
