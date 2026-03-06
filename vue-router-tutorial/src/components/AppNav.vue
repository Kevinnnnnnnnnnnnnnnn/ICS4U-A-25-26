<template>
  <nav class="nav">
    <RouterLink to="/" class="link" active-class="active">Home</RouterLink>
    <RouterLink to="/products" class="link" active-class="active">Products</RouterLink>
    <RouterLink to="/cart" class="link" active-class="active">Cart</RouterLink>
    <RouterLink to="/reviews" class="link" active-class="active">Reviews</RouterLink>
    <RouterLink to="/about" class="link" active-class="active">About</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.nav { display: flex; gap: 12px; padding: 12px; border: 1px solid #ddd; border-radius: 10px; }
.link { text-decoration: none; color: #333; padding: 6px 10px; border-radius: 8px; }
.active { background: #111; color: white; }
</style>
