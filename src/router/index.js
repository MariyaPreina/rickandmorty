import { createRouter, createWebHistory } from 'vue-router'
import CharactersPage from '../views/CharactersPage'
import CharacterPage from '../views/CharacterPage'
import EpisodePage from '../views/EpisodePage'

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
      title: `${process.env.VUE_APP_TITLE} | Characters`
    }
  },
  {
    path: '/characters/:id',
    name: 'character',
    props: true,
    component: CharacterPage,
    meta: {
      title: `${process.env.VUE_APP_TITLE} | Character`
    }
  },
  {
    path: '/episode/:id',
    name: 'episode',
    props: true,
    component: EpisodePage,
    meta: {
      title: `${process.env.VUE_APP_TITLE} | Episode`
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(savedPosition || { top: 0 })
      }, 100)
    })
  }
})

export default router
