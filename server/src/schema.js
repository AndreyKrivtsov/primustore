import _ from 'lodash'
import { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLInt } from 'graphql'

import ProductsDb from './data/products.js'

const products = [...ProductsDb]
const shoppingCard = [
    {
        id: '8dlx7af45fd39dv79ad',
        name: 'Product 4',
        cost: '15',
    },
]

const ProductType = new GraphQLObjectType({
    name: "product",
    description: "Products desc",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        cost: { type: GraphQLString },
    })
})

const ShoppingCardType = new GraphQLObjectType({
    name: "ShoppingCard",
    description: "ShoppingCard desc",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        cost: { type: GraphQLString },
    })
})

const BlogQueryRootType = new GraphQLObjectType({
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
                return products
            }
        },
        shoppingCard: {
            type: new GraphQLList(ShoppingCardType),
            description: "List of all ShoppingCard",
            args: {
                id: { type: GraphQLString },
                limit: { type: GraphQLInt }
            },
            resolve: function () {
                return shoppingCard
            }
        },
    })
})

const MutationRootType = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation",
    fields: {
        createProduct: {
            type: ProductType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                cost: { type: GraphQLString },
            },
            resolve: function (source, args) {
                if (!args.id) args.id = Array(20).fill(0, 0).map(byte => (byte + Math.ceil(Math.random() * 16)).toString(16)).join('')
                
                let newProduct = {
                    id: args.id, 
                    name: args.name, 
                    cost: args.cost, 
                }

                products.push(newProduct)
                return newProduct
            }
        }
    }
})

const AppSchema = new GraphQLSchema({
    query: BlogQueryRootType,
    mutation: MutationRootType
})

export default AppSchema