import ApolloClient from 'apollo-boost'

export const apolloClient = new ApolloClient({
  //uri: process.env.GRAPHQL_URL
  uri: 'http://localhost:3000'
})