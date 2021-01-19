<template>
    <div>sfsfdsdfsfsdf</div>
</template>

<script>
//import PButton from '@/components/ui/PButton'

export default {
    name: 'BaseListComponent',

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

    async mounted() {
        // await this.adminInstance.ormMapper.getOrmList().then((items) => {
        //     this.items = items
        // })

        // console.log(this.items)

        console.log('mounted mixin')
    },

    //render: require('../templates/ListTemplate.vue').default.render
}
</script>