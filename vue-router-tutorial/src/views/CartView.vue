<template>
  <section>
    <h1>Cart</h1>

    <p v-if="cart.length === 0">Your cart is empty.</p>
    <ul v-else>
      <li v-for="(id, idx) in cart" :key="idx">Product ID: {{ id }}</li>
    </ul>

    <div class="row">
      <button class="btn" @click="addSample">Add sample item</button>
      <button class="btn" @click="clear">Clear</button>
      <RouterLink class="btnLink" to="/checkout">Go to Checkout</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// For this tutorial, cart is local to the page.
// In real apps you'd use a store (Pinia) or lift state up.
const cart = ref([])

function addSample() {
  cart.value.push(2234)
  localStorage.setItem('cartCount', String(cart.value.length))
}
function clear() {
  cart.value = []
  localStorage.setItem('cartCount', '0')
}

</script>

<style scoped>
.row { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
.btn { padding: 6px 10px; border-radius: 10px; border: 1px solid #111; background: white; cursor: pointer; }
.btnLink { padding: 6px 10px; border-radius: 10px; background: #111; color: white; text-decoration: none; }
</style>
