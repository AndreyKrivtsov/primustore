import _ from 'lodash'
import { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLBoolean, GraphQLSchema, GraphQLInt } from 'graphql'

import ProductsData from './data/products.js'
import CategoryData from './data/category.js'

const products = [...ProductsData]
const categories = [...CategoryData]

const ProductType = new GraphQLObjectType({
    name: "product",
    description: "Products desc",
    fields: () => ({
        id: { type: GraphQLString },
        categoryId: { type: GraphQLString },
        name: { type: GraphQLString },
        cost: { type: GraphQLString },
        imgUrl: { type: GraphQLString },
    })
})

const CategoryType = new GraphQLObjectType({
    name: "Category",
    description: "Category desc",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        active: { type: GraphQLBoolean },
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
        category: {
            type: new GraphQLList(CategoryType),
            description: "List of all ShoppingCard",
            args: {
                id: { type: GraphQLString },
                limit: { type: GraphQLInt }
            },
            resolve: function () {
                return categories
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
                categoryId: { type: GraphQLString },
                name: { type: GraphQLString },
                cost: { type: GraphQLString },
                imgUrl: { type: GraphQLString },
            },
            resolve: function (source, args) {
                if (!args.id) args.id = Array(20).fill(0, 0).map(byte => (byte + Math.ceil(Math.random() * 16)).toString(16)).join('')
                products.push(args)
                return args
            }
        },
        createCategory: {
            type: CategoryType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                active: { type: GraphQLBoolean },
            },
            resolve: function (source, args) {
                if (!args.id) args.id = categories.length
                categories.push(args)
                return args
            }
        }
    }
})

const AppSchema = new GraphQLSchema({
    query: BlogQueryRootType,
    mutation: MutationRootType
})

export default AppSchema