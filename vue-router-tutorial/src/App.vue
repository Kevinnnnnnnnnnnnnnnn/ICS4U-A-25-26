<template>
  <div class="app-shell">
    <AppNav />
    <main class="page">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AppNav from './components/AppNav.vue'
</script>

<style scoped>
.app-shell { max-width: 1000px; margin: 0 auto; padding: 16px; }
.page { padding-top: 12px; }
</style>
