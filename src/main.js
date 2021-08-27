import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'// 특정한 폴더의 파일이름이 index.js 일 경우 이 를 생략할 수 있다. 
import store from './store'
import loadImage from './plugins/loadImage'

createApp(App)
  .use(router) //$route , $router
  .use(store) // $store
  .use(loadImage) //#loadImage
  .mount('#app') 
  