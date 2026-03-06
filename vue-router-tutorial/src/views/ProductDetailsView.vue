<template>
  <section>
    <h1>Product Details</h1>

    <p><strong>Route param id:</strong> {{ id }}</p>

    <p v-if="product">
      <strong>{{ product.name }}</strong><br />
      Color: {{ product.color }}<br />
      Price: ${{ product.price }}
    </p>
    <p v-else>
      Product not found.
    </p>

    <div class="row">
      <button class="btn" @click="goBack">Back</button>
      <RouterLink class="btnLink" to="/products">All Products</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: { type: String, required: true } // because route params are strings by default
})

const router = useRouter()

const catalog = [
  { id: '2234', name: 'Vue Mastery Socks', color: 'green', price: 19.99 },
  { id: '2235', name: 'Vue Mastery Socks', color: 'blue', price: 19.99 },
  { id: '3001', name: 'Hoodie', color: 'black', price: 49.99 }
]

const product = computed(() => catalog.find(p => p.id === props.id))

function goBack() {
  router.back()
}
</script>

<style scoped>
.row { display: flex; gap: 10px; margin-top: 14px; align-items: center; }
.btn { padding: 6px 10px; border-radius: 10px; border: 1px solid #111; background: white; cursor: pointer; }
.btnLink { padding: 6px 10px; border-radius: 10px; background: #111; color: white; text-decoration: none; }
</style>
