const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP());

const port = 3080;
app.listen(port, () => console.log(`Listening on port: ${port}`));