require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const models = require('./models/index')

const app = express();

app.use(bodyParser.json());

// Graphql endpoint - If a request is made to graphql, it's handled by express-graphql. express-graphql requires a schema. Graphiql is an in broswer IDE for query testing
app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true,
}));

// Sync all defined models to the database
models.sequelize.sync().then(() => {
   const port = 3080;
   app.listen(port, () => console.log(`Listening on port: ${port}`));
});