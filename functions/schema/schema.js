const { ApolloServer, gql } = require("apollo-server-lambda")

const typeDefs = gql`
  type Query {
    allUsers: [User!]
    userById(id: Int!): User
    allStations: [Station!]
    stationById(id: String!): Station
    allModels: [Model!]
    modelByName(name: String!): Model
  }

  type User {
    id: Int!
    name: String!
    email: String!
    role: String!
    lat: Float
    lon: Float
    state: String
    stations: [Station]
    models: [Model]
  }

  type Model {
    name: String!
    isSeason: Boolean
  }

  type Station {
    network: String!
    lon: Float!
    state: String!
    elev: Int
    lat: Float!
    id: String!
    name: String!
  }
`

const users = [
  { id: 1, name: "Alex", email: "Alex@example.com", role: "dev" },
  { id: 2, name: "Dan", email: "Dan@example.com", role: "admin" },
  { id: 3, name: "Joe", email: "Joe@example.com", role: "user" },
]

const models = [
  { id: 1, name: "Apple Maggot", users: [1, 3] },
  { id: 2, name: "Cranberry model", users: [1, 2] },
]

const stations = [
  {
    network: "newa",
    lon: -74.248764,
    state: "NY",
    elev: 386,
    lat: 41.807602,
    id: "acc",
    name: "Accord",
  },
  {
    network: "miwx",
    lon: -85.9605,
    state: "MI",
    elev: 935,
    lat: 43.5544,
    id: "ew_aet",
    name: "Aetna/Fremont",
  },
]

const resolvers = {
  Query: {
    allUsers: (root, args, context) => {
      return users
    },
    userById: (root, args, context) => {
      return users.find(d => d.id === args.id) || "NOTFOUND"
    },
    allStations: (root, args, context) => {
      return stations
    },
    stationById: (root, args, context) => {
      return stations.find(d => d.id === args.id) || "NOTFOUND"
    },
    allModels: (root, args, context) => {
      return models
    },
    modelByName: (root, args, context) => {
      return models.find(d => d.name === args.name) || "NOTFOUND"
    },
  },
  Model: {
    names: (root, args, context) => {
      return models.filter(m => m)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
