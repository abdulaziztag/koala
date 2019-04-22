import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Film from '@/components/Film'
import Status404 from '@/components/Status404'
import Categories from '@/components/Category'
import Add from '@/components/Add'
import ForSerials from '@/components/ForSerials'
import Seria from '@/components/Seriya'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/film/:id',
      props: true,
      name: 'Film',
      component: Film
    },
    {
      path: '/serial/:id',
      props: true,
      name: 'ForSerials',
      component: ForSerials,
      children: [
        {
          path: ':unique/:ident',
          props: true,
          component: Seria
        }
      ]
    },
    {
      path: '*',
      name: 'Status404',
      component: Status404
    },
    {
      path: '/category/:id',
      props: true,
      name: 'Categories',
      component: Categories
    },
    {
      path: '/koalafilmsaddfilmAAE',
      name: 'AddFilm',
      component: Add
    }
  ]
})
