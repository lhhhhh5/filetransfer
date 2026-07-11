export default [
  {path:"/",redirect:"/home"},
  {path: '/home', name: 'home', component: () => import('../view/home/index.vue'),
    children:[
      {
        path: "/shouye", name: 'shouye', component: () => import('../view/shouye/index.vue')
      },
      {
        path: "/upload", name: 'upload', component: () => import('../view/upload/index.vue')
      },
      {
        path: "/download", name: 'download', component: () => import('../view/download/index.vue')
      }
    ]
  },


]