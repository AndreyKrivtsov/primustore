export default {
    name: 'ProductMixin',
    methods: {
        deleteItem(productId) {
            ShoppingCardModel.insert({
                data: { product_id: productId },
            })
        },
    },
    render: require('../templates/ShoppingCardTemplate').default.render
}
