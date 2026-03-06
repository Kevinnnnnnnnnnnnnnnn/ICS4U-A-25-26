import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views (best practice for bigger apps)
const HomeView = () => import('../views/HomeView.vue')
const ProductsView = () => import('../views/ProductsView.vue')
const ProductDetailsView = () => import('../views/ProductDetailsView.vue')
const CartView = () => import('../views/CartView.vue')
const CheckoutView = () => import('../views/CheckoutView.vue')
const ReviewsView = () => import('../views/ReviewsView.vue')
const AboutView = () => import('../views/AboutView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: { requiresAuth: false } // example meta
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: ProductDetailsView,
      props: true // passes route params as props
    },
    { path: '/cart', name: 'cart', component: CartView },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { requiresNonEmptyCart: true }
    },
    { path: '/reviews', name: 'reviews', component: ReviewsView },
    { path: '/about', name: 'about', component: AboutView },

    // 404 (must be last)
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ],
  scrollBehavior() {
    // Always scroll to top on route change
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.meta.requiresNonEmptyCart) {
    const count = Number(localStorage.getItem('cartCount') || '0')
    if (count <= 0) {
      return { name: 'cart' } // redirect
    }
  }
})

export default router
