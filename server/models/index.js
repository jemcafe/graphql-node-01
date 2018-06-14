const Sequelize = require('sequelize');
const operatorsAliases = require('./operatorsAliases')(Sequelize); // Sets the string aliases

const sequelize = new Sequelize(
   // process.env.DB_DATABASE,
   // process.env.DB_USERNAME,
   // process.env.DB_PASSWORD,
   process.env.CONNECTION_STRING,
   { 
      dialect: 'postgres',
      operatorsAliases
   }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// db
const models = {
   author: sequelize.import('./author'),
   book: sequelize.import('./book')
};

// Object.keys(obj) returns an array of object property names
Object.keys(models).forEach(modelName => {
   // If a model has an associate property
   if ('associate' in models[modelName]) {
      models[modelName].associate(models);
   }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;

