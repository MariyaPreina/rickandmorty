import { createRouter, createWebHistory } from 'vue-router'
import CharactersPage from '../views/CharactersPage'
import CharacterPage from '../views/CharacterPage'

const routes = [
  {
    path: '/',
    redirect: '/characters'
  },
  {
    path: '/characters',
    name: 'characters',
    component: CharactersPage,
    meta: {
      title: `${process.env.VUE_APP_ROOT_TITLE} | Characters`
    }
  },
  {
    path: '/characters/:id',
    name: 'character',
    props: true,
    component: CharacterPage,
    meta: {
      title: `${process.env.VUE_APP_ROOT_TITLE} | Character`
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  /* scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  } */
})

export default router
