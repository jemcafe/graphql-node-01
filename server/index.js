const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// Graphql endpoint - If a request is made to graphql, it's handled by express-graphql. express-graphql requires a schema.
// graphiql is an in broswer IDE for query testing
app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true,
}));

const port = 3080;
app.listen(port, () => console.log(`Listening on port: ${port}`));