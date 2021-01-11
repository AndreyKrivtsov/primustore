<template>
  <div class="index">
    <ProductsList />
    <ShoppingCard />
  </div>
</template>

<script>
import ShoppingCard from '../components/shoppingCard/ShoppingCard'
import ProductsList from '@/components/productsList/ProductsList.vue'

export default {
  name: 'Home',
  components: {
    ProductsList,
    ShoppingCard
  }
}
</script>

<style lang="scss" scoped>
.index {
  display: flex;
}
</style>