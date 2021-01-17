<template>
    <div class="index">
            <div class="content">
                <div class="content__left">
                    <CategoryList v-model="activeCategoryId"></CategoryList>
                    <ProductList :active-category="activeCategoryId"></ProductList>
                </div>
                <div class="content__rigth">
                    <ShoppingCard></ShoppingCard>
                </div>
            </div>
    </div>
</template>

<script>
import ComponentModel from '../models/ComponentModel'
import ProductList from '../components/product/ProductList'
import ShoppingCard from '../components/shoppingCard/ShoppingCard'
import PButton from '../components/ui/PButton'
import CategoryList from '../components/category/CategoryList.vue'

export default {
    name: 'Index',
    components: {
        ProductList,
        ShoppingCard,
        PButton,
        CategoryList,
    },

    data() {
        return {
            activeCategoryId: null,
        }
    },

    computed: {
        activeComponent() {
            return ComponentModel.query().where('active', true).first()
        },
    },

    methods: {
        showComponent(name) {
            if (this.activeComponent) ComponentModel.delete(this.activeComponent.id)

            ComponentModel.insert({
                data: {
                    name,
                    active: true,
                    attrs: { id: 0 },
                },
            })
        },
        onUpdate() {
            console.log('onUpdate in App')
        },
    },

    mounted() {
        this.showComponent('ProductList')
    },
}
</script>

<style lang="scss" scoped>
.content {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;

    .content__left {
        width: 70%;
        justify-content: center;
    }

    .content__rigth {
        position: fixed;
        top: 30px;
        right: 0;
        width: 30%;
        height: 100%;
        padding: 30px 0;
        border-left: 1px solid;
    }
}

@media screen and (max-width: 1000px) {
    .content {
        justify-content: center;

        .content__left {
            width: 100%;
            flex-grow: 1;
        }

        .content__rigth {
            position: initial;
            width: 100%;
            border-left: none;
        }
    }
}
</style>