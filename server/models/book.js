module.exports = (sequelize, DataType) => {
   // The model is defined. Sequelize adds the id, so it doesn't need to be defined.
   const Book = sequelize.define('books', {
      title: DataType.STRING,
      genre: DataType.INTEGER
   });

   // Associations (references)
   Book.associate = models => {
      // one-to-one (author must match the casing of the model name)
      Book.belongsTo(models.author , {
         foreignKey: 'author_id'
      });
   };

   return Book;
}