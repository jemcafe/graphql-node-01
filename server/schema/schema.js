const graphql = require('graphql');

const { 
   GraphQLSchema, 
   GraphQLObjectType, 
   GraphQLString,     // GraphqlString - string types
   GraphQLInt,        // GraphqlInt - integer types
   GraphQLID,         // GraphqlID - number or string types (ex. 2 or "2")
   GraphQLList        // GraphQLList - list type
} = graphql;

// dummy data
var books = [
   { name: 'Ring Well', genre: 'Fantasy', id: '1', authorId: '1' },
   { name: 'Wayside School', genre: 'School', id: '2', authorId: '2' },
   { name: 'Heather\'s cook book', genre: 'Cooking', id: '3', authorId: '3' }
]
var authors = [
   { name: 'John Kale', age: 41, id: '1' },
   { name: 'Louis Sachar', age: 64, id: '2' },
   { name: 'Heather Thompson', age: 34, id: '3' },
]

// Graphql object - Define type
const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: { 
         type: AuthorType,
         resolve: (parent, args) => {
            // The parent is the book object
            return authors.find(e => e.id === parent.authorId);
         }
      }
   })
});

const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
         type: new GraphQLList(BookType), // A list of books
         resolve: (parent, args) => {
            // The author's id must match the book's authorId
            return books.filter(e => e.authorId === parent.id);
         }
      }
   })
});

// Query - When a book is queried, this object will be used
const rootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      book: {
         type: BookType,
         args: { 
            // An id is expected
            id: { type: GraphQLID } 
         },
         resolve: (parent, args) => {
            // Get data from database
            return books.find(e => e.id === args.id);
         }
      },
      author: {
         type: AuthorType,
         args: {
            id: { type: GraphQLID },
         },
         resolve: (parent, args) => {
            return authors.find(e => e.id === args.id);
         }
      }
   }
});

// A new schema exported. The root query is used.
module.exports = new GraphQLSchema({
   query: rootQuery
});