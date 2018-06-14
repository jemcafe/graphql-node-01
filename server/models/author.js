module.exports = (sequelize, DataType) => {
   // The model is defined
   const Author = sequelize.define('authors', {
      name: DataType.STRING,
      age: DataType.INTEGER
   });

   // Associations (references)
   Author.associate = models => {
      // n:m
      Author.belongsToMany(models.book, {
         through: 'authorBook',   // The join table. The can also be a model defined for joining.
         foreignKey: 'author_id'
      });
   };

   return Author;
}