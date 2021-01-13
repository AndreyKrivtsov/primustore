import { ApiItemMixin } from '../primusfront/api/item'

export default {
    name: 'ProductMixin',
    mixins: [
        ApiItemMixin,
    ],
    methods: {
        addItem: function () {
            console.log('[ProductMixin] addItem')
        },
    },
    render: require('../templates/ListTemplate').default.render
}
