export default {
    name: 'BaseListMixin',

    data() {
        return {
            items: [],
        }
    },

    computed: {
        listHeader() {
            return this.adminInstance.listHeader
        },
    },

    async mounted() {
        await this.adminInstance.ormMapper.getOrmList().then((items) => {
            this.items = items
        })

        console.log(this.items)
    },
}
