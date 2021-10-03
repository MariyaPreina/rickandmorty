import { createRouter, createWebHashHistory } from 'vue-router'
import CharactersPage from '../views/CharactersPage'
import CharacterPage from '../views/CharacterPage'
import EpisodePage from '../views/EpisodePage'
import { publicPath } from '../../vue.config'

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
  history: createWebHashHistory(),
  base: publicPath,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
