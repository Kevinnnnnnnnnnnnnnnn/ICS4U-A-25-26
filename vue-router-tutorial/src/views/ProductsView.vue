<template>
  <section>
    <h1>Products</h1>

    <div class="toolbar">
      <span>Filter (query string example):</span>
      <RouterLink class="pill" :to="{ name: 'products', query: { color: 'green' } }">green</RouterLink>
      <RouterLink class="pill" :to="{ name: 'products', query: { color: 'blue' } }">blue</RouterLink>
      <RouterLink class="pill" :to="{ name: 'products', query: {} }">clear</RouterLink>
    </div>

    <div class="grid">
      <ProductCard
        v-for="p in filteredProducts"
        :key="p.id"
        :product="p"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()

const products = [
  { id: 2234, name: 'Vue Mastery Socks', color: 'green', price: 19.99 },
  { id: 2235, name: 'Vue Mastery Socks', color: 'blue', price: 19.99 },
  { id: 3001, name: 'Hoodie', color: 'black', price: 49.99 }
]

const filteredProducts = computed(() => {
  const color = route.query.color
  if (!color) return products
  return products.filter(p => p.color === color)
})
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
.toolbar { display: flex; gap: 10px; align-items: center; margin: 10px 0 16px; flex-wrap: wrap; }
.pill { border: 1px solid #ddd; padding: 4px 10px; border-radius: 999px; text-decoration: none; color: #333; }
</style>
