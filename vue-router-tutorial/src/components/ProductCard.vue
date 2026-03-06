<template>
  <article class="card">
    <h3>{{ product.name }}</h3>
    <p>Color: {{ product.color }}</p>
    <p>Price: ${{ product.price }}</p>

    <RouterLink
      class="btn"
      :to="{ name: 'product-details', params: { id: product.id } }"
    >
      View Details
    </RouterLink>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  product: { type: Object, required: true }
})
</script>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 12px; padding: 12px; }
.btn { display: inline-block; margin-top: 10px; padding: 6px 10px; border-radius: 10px; background: #111; color: white; text-decoration: none; }
</style>
