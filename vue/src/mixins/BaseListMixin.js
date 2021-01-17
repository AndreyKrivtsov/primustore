import '../assets/style.scss'
import PButton from '../components/ui/PButton'

export default {
    name: 'BaseListMixin',
    components: { PButton },
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
