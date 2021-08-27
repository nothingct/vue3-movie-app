import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'
export default createRouter({
  // Hash
  // https://google.com/#/search
  history : createWebHashHistory(),
  scrollBehavior(){
    return { top : 0}
  },
  //pages
  //https://google.com 
  routes:[
    //각 페이지마다 동작할 컴포넌트 설정
    {
      path:'/',
      component:Home
    },
    {
      path:'/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component:About
    },
    {
      path : '/:notFound(.*)',
      component: NotFound
    }
  ]
})