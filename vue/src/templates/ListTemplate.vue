<template>
    <div class="list">
        <div class="list__title">{{ listHeader }}</div>
        <div class="list__items">
            <div class="list__item" v-for="product in items" :key="product.id">
                <div>{{ product.id }}</div>
                <div>{{ product.name }}</div>
                <div>{{ product.cost }}</div>
                <div><PButton @click="addItem(product.id)">Добавить в корзину</PButton></div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'ListTemplate',
}
</script>