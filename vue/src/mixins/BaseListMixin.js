//import PButton from '@/components/ui/PButton'

export const BaseListMixin = {
    name: 'BaseListMixin',

    //template: '<div>sdfsfsdfsdf</div>',

    //components: { PButton },

    data() {
        return {
            items: [],
        }
    },

    computed: {
        // listHeader() {
        //     return this.adminInstance.listHeader
        // },
    },

    mounted() {
        // await this.adminInstance.ormMapper.getOrmList().then((items) => {
        //     this.items = items
        // })

        // console.log(this.items)

        console.log('mounted mixin')
    },

    render: function (createElement) {
        return createElement('h1', 'Privet')
      }

    // render: function (createElement) {
    //     return createElement(
    //         'h1',   // имя тега
    //         this.$slots.default // массив дочерних элементов
    //     )
    // },

    //render: require('../templates/ListTemplate.vue').default.render
}

export default BaseListMixin