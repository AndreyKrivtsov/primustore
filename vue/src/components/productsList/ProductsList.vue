<template>
    <div class="product-list">
        <div class="product-list__title">Продукция</div>
        <div class="product-list__item" v-for="product in products" :key="product.id">
            <div>{{ product.id }}</div>
            <div>{{ product.name }}</div>
            <div>{{ product.cost }}</div>
            <div><button @click="add(product)">Добавить в корзину</button></div>
        </div>
    </div>
</template>

<script>
import { ProductsMock } from './ProductsMock'
import { adminInstance } from './ProductsListAdmin'

export default {
    name: 'ProductsList',
    data() {
        return {
            products: [],
        }
    },
    computed: {},
    methods: {
        add(product) {
            
        }
    },
    async mounted() {
        adminInstance.ormMapper.getOrmList().then((items) => {
            this.products = items
        })
    },
}
</script>

<style lang="scss" scoped>
.product-list {
    .product-list__title {
        margin-bottom: 30px;
    }

    .product-list__item {
        display: flex;
        justify-content: center;
        margin: 10px auto 0 auto;
        width: 600px;

        & div:nth-child(n) {
            flex-grow: 1;
        }
    }
}
</style>
