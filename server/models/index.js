const Sequelize = require('sequelize');
const operatorsAliases = require('./op/operatorsAliases')(Sequelize);

// Configuration
// The ssl (secure sockets layer) must be set to true when connecting over ssl.
// For the latest version of sequelize, the operatorsAlias must be set
const config = { 
   dialect: 'postgres',
   ssl: true,
   dialectOptions: {
      ssl: true
   },
   operatorsAliases
};


const sequelize = new Sequelize(
   process.env.CONNECTION_STRING,
   config
);

// Checks the connection
sequelize.authenticate()
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
   // If there's an associate property a model...
   if ('associate' in models[modelName]) {
      // The associate method runs
      models[modelName].associate(models);
   }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;

