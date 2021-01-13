<template>
    <div class="list">
        <div class="list__title">{{ listHeader }}</div>
        <div class="list__items">
            <div v-for="product in items" :key="product.id">
                <div>{{ product.id }}</div>
                <div>{{ product.name }}</div>
                <div>{{ product.cost }}</div>
                <div><button @click="deleteItem(product.id)">Удалить из корзины</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListTemplate',
}
</script>