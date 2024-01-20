import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../views/PricingView.vue')
    },
    {
      path: '/benefits',
      name: 'benefits',
      component: () => import('../views/BenefitsView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/account/settings',
      name: 'accountSettings',
      component: () => import('../views/AccountSettingsView.vue')
    },
    {
      path: '/account/courses',
      name: 'accountCourses',
      component: () => import('../views/UserCoursesView.vue')
    },
    {
      path: '/account/courses/:id',
      name: 'CourseView',
      component: () => import('../views/CourseView.vue')
    },
    {
      path: '/admin/courses/',
      name: 'CourseAdminView',
      component: () => import('../views/CourseAdminView.vue')
    }
  ]
})

export default router
