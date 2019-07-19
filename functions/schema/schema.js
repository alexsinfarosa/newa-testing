const { ApolloServer, gql } = require("apollo-server-lambda")

const typeDefs = gql`
  type Query {
    allUsers: [User!]
    user(id: Int!): User
    userByName(name: String!): User
  }
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    lat: Int
    lon: Int
  }
`

const users = [
  { id: 1, name: "Alex", email: "Alex@example.com", role: "dev" },
  { id: 2, name: "Dan", email: "Dan@example.com", role: "admin" },
  { id: 3, name: "Joe", email: "Joe@example.com", role: "user" },
]

const resolvers = {
  Query: {
    user: (root, args, context) => {
      return
    },
    userByName: (root, args, context) => {
      return users.find(x => x.name === args.name) || "NOTFOUND"
    },
    allUsers: (root, args, context) => {
      return users
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
