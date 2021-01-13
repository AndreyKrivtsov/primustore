<template>
    <div class="list">
        <div class="list__title">{{ listHeader }}</div>
        <div class="list__item" v-for="product in items" :key="product.id">
            <div>{{ product.id }}</div>
            <div>{{ product.name }}</div>
            <div>{{ product.cost }}</div>
            <div><button @click="addItem(product.id)">Добавить в корзину</button></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListTemplate',
}
</script>

<style lang="scss">
.list {
    margin-top: 30px;

    .list__title {
        font-size: 2rem;
        margin-bottom: 30px;
    }

    .list__item {
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