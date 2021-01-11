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

const BlogQueryRootType = new GraphQLObjectType({
    name: "Schema",
    description: "Schema desc",
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
        }
    })
})

const AppSchema = new GraphQLSchema({
    query: BlogQueryRootType
    /*
       mutation: ProductMutationRootType
    */
})

export default AppSchema