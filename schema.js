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

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        available: { type: GraphQLBoolean}
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve(parentvalue, args){
                return books
            }
        },
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLInt}
            },
            resolve(parentvalue, args){
                return books.find((b) => b.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})