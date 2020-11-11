// Using the following Object Types from graphql package
// Every js file can import something and export something, all with require are import, all with export word are exported

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNotNull,
    GraphQLBoolean,
} = require('graphql');

// creating database locally for demo
const books = [
    {
        id: 0,
        title: 'Who is your Santa - Vaishnavi Nair',
        available: true
    },
    {
        id: 1,
        title: 'Dreams by my Father - Barack Obama',
        available: true
    }
]
// fake database creation complete (just for demo)

// GraphQL treats data as edges and nodes, we query based on nodes that have data and give conditions as edges
// BookType object Initiation
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        available: { type: GraphQLBoolean}
    }
})

//Root Query that is executed as it is exported from this script
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            // Here, we are not passing args to resolve as we are not querying conditionally, we return whole books structure
            resolve(parentvalue, args){
                return books
            }
        },
        book: {
            type: BookType,
            //// Here, we are passing args to resolve as we are querying conditionally based on id
            args: {
                id: { type: GraphQLInt}
            },
            resolve(parentvalue, args){
                return books.find((b) => b.id === args.id);
            }
        }
    }
})

// Adding for mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBook: {
            type: BookType,
            args: {
                title: {type: GraphQLString },
            },
            resolve(parametervalue, args) {
                const book = {
                    title: args.title,
                    id: books.length,
                    available: true
                }

                books.push(book);
                return book
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})

/*
    Queries I used in the Browser
    -------------------------------

mutation{
   addBook(title: "Power of Positive thinking") {
     id,
     title,
     available
   }
 }

query{
    book(id:1){
        title,
            available
    },
    books{
        title,
            available
    }
}
*/