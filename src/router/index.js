import Vue from 'vue'
import Router from 'vue-router'
import TiledPictures from '@/components/TiledPictures'
import ImageView from '@/components/ImageView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TiledPictures',
      component: TiledPictures
    },
    {
      path: '/view/:image_id/:index',
      name: 'ImageView',
      component: ImageView,
      props: true
    }
  ]
})
