const { gql } = require('apollo-server');

const typeDefs = gql`
type Launch {
  site: String
  mission: Mission
  rocket: Rocket
}

type Rocket {
  id: ID!
  name: String
  type: String
}

type Mission {
  name: String
  missionPatch(size: PatchSize): String
}

enum PatchSize {
  SMALL
  LARGE
}

type Query {
  launches: [Launch]!
  launch: Launch
}

`;



module.exports = typeDefs;
