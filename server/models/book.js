module.exports = (sequelize, DataType) => {
   // The model is defined. Sequelize adds the id, so it doesn't need to be defined.
   const Book = sequelize.define('books', {
      title: DataType.STRING,
      genre: DataType.INTEGER
   });

   // Associations (references)
   Book.associate = models => {
      // one-to-one (The model's property name casing of the model name in define)
      Book.belongsTo(models.author , {
         foreignKey: 'author_id'
      });
   };

   return Book;
}