import express from 'express'
import Cors from './cors.js'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema.js'

const port = 3000
const app = express()

app.use(Cors)

app.all('/', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(port)
console.log('GraphQL API server running at localhost:' + port)