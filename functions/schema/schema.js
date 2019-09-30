const { ApolloServer, gql } = require("apollo-server-lambda")
import { isAuthenticated, getProfile, login } from "../../src/utils/auth.js"

const typeDefs = gql`
  type Query {
    allUsers: [User!]
    userById(id: Int!): User
    allStations: [Station!]
    stationById(id: String!): Station
    allModels: [Model!]
    modelByName(name: String!): Model
  }

  type Mutation {
    createUser(name: String!, email: String!, role: String!): User!
    addStationToUser(
      network: String!
      lon: Float!
      state: String!
      elev: Int
      lat: Float!
      id: String!
      name: String!
      userId: ID!
    ): Station!
  }

  type User {
    id: ID!
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
    developer: String
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

const users = []

const models = [
  { id: 1, name: "Apple Maggot" },
  { id: 2, name: "Cranberry model" },
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
  Mutation: {
    createUser: (root, args, context) => {
      if (!isAuthenticated()) {
        throw new Error("User has not been authenticated.")
      }

      console.log(login())
      const user = getProfile()
      console.log(user)

      users.push(user)
      return user
    },
    addStationToUser: (root, args, context) => {
      console.log(args)
      const userIndex = users.findIndex(user => user.id === args.userId)

      if (userIndex === -1) {
        throw new Error("User not found.")
      }
      console.log(userIndex)
      const stationExist = users[userIndex].stations.some(
        stn => stn.id === args.id
      )
      console.log(stationExist)

      const { userId, ...station } = args
      console.log(station)
      if (!stationExist) {
        users[userIndex].stations.push(station)
      }

      return args
    },
  },
  User: {
    stations: (root, args, context) => {
      return root.stations || []
    },
    models: (root, args, context) => {
      return root.models || []
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
