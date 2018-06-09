const graphql = require('graphql');


const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
   { name: 'Lord of the Rings', genre: 'Fantasy', id: '1' },
   { name: 'Wayside School', genre: 'School', id: '2' },
   { name: 'Tyrants', genre: 'Politics', id: '3' }
]

// Graphql object - Defined Book type
const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      genre: { type: GraphQLString }
   })
});

// Query - When a book is queried, this will be used
const rootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      book: {
         type: BookType,
         args: { 
            // An id is expected
            id: { type: GraphQLString } 
         },
         resolve: (parent, args) => {
            // Get data from database
            return books.filter(e => e.id === args.id);
         }
      }
   }
});

// A new schema exported. The root query is used.
module.exports = new GraphQLSchema({
   query: rootQuery
});