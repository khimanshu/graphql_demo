//First file to be executed
//Triggered when app(via Server) is started, server start command in package.json line 7

const express = require('express');
const expressGraphQL = require('express-graphql');

//require schema as we will use schema for running query
const schema = require('./schema')

const app = express();
//exposing app at port 4000
const PORT = 4000;

app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema: schema
}));

app.listen(PORT, () => {
    console.log("Listening on port: "+PORT);
});