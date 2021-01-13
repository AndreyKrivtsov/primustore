import _ from 'lodash'
import { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLInt } from 'graphql'

import Products from './data/products.js'
import ShoppingCard from './data/shopping-card.js'

const ProductType = new GraphQLObjectType({
    name: "product",
    description: "Products desc",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        cost: { type: GraphQLString },
        limit: { type: GraphQLString }
    })
})

const ShoppingCardType = new GraphQLObjectType({
    name: "ShoppingCard",
    description: "ShoppingCard desc",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        products: {
            type: ProductType,
            resolve: function (card) {
                return _.find(Products, a => a.id == card.products_id)
            }
        },

    })
})

const TestType = new GraphQLObjectType({
    name: "Test",
    resolve: function () {
        return 'sdgsdfds'
    }
})

const QueryRootType = new GraphQLObjectType({
    name: "Query",
    description: "Query desc",
    fields: () => ({
        product: {
            type: new GraphQLList(ProductType),
            description: "List of all products",
            args: {
                id: { type: GraphQLString },
                limit: { type: GraphQLInt }
            },
            resolve: function (root, args) {
                return Products
            }
        },
        shoppingCard: {
            type: new GraphQLList(ShoppingCardType),
            description: "List of all ShoppingCard",
            resolve: function () {
                return ShoppingCard
            }
        },
        hello: {
            type: GraphQLString,

            resolve: function () {
                return "Hello World";
            }
        }
    })
})

const MutationRootType = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation",
    fields: {
        createProduct: {
            type: ProductType,
            args: {
                // input: { type: inputMovieType }
            },
            resolve: function (source, args) {
                console.log(args)

                // let product = {
                //     id: args.id, 
                //     name: args.name, 
                //     year: args.year, 
                //     directorId: args.directorId
                // }

                // console.log(product)

                // Products.push(product)

                // return _.find(Products, { id: args.input.id })
            }
        }
    }
})

const AppSchema = new GraphQLSchema({
    query: QueryRootType,
    //mutation: MutationRootType
})

export default AppSchema