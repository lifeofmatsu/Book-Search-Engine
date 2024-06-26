const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    input InputBook {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }    

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        searchBooks(query: String!): [Book]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(newBook: InputBook!): User
        removeBook(bookId: ID!): User
    } 
`;

module.exports = typeDefs;