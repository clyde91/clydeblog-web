import {
  createRouter,
  createWebHistory
} from 'vue-router'
//导入子视图HomeView.vue
import LayoutIndex from '../views/layout/LayoutIndex.vue'
import Layout from '../views/layout/Layout.vue'
import LayoutAdmin from '../views/layout/LayoutAdmin.vue'
const routes = [{
    //首页路由
    path: '/',
    component: LayoutIndex,
    children: [{
      path: '',
      name: 'home',
      component: () => import('@/views/home/IndexView'),
    }, ]
  },
  //说说路由
  {
    path: '/gossip',
    component: Layout,
    children: [{
      path: '',
      name: 'gossip',
      component: () => import('@/views/gossip/Gossip'),
    }, ]
  },
  //日志路由
  {
    path: '/diary',
    component: Layout,
    children: [{
        path: '',
        name: 'diary',
        component: () => import('@/views/diary/DiaryList'),
      },
      {
        path: ':id',
        name: 'diarydetail',
        component: () => import('@/views/diary/DiaryDetail'),
      }
    ]
  },
  //博客路由
  {
    path: '/blog',
    component: Layout,
    children: [{
      path: ':id',
      name: 'blogdetail',
      component: () => import('@/views/blog/BlogDetail'),
    }, ]
  },
  //博客路由
  {
    path: '/arch_blog',
    component: Layout,
    children: [{
        path: '',
        name: 'arch_blog',
        component: () => import('@/views/blog/BlogList'),
      },
      {
        path: ':id',
        name: 'arch_blogdetail',
        component: () => import('@/views/blog/BlogDetail'),
      },
      {
        path: 'category:id',
        name: 'arch_blogcategory',
        component: () => import('@/views/blog/BlogList'),
      },
    ]
  },
  //博客路由
  {
    path: '/code_blog',
    component: Layout,
    children: [{
        path: '',
        name: 'code_blog',
        component: () => import('@/views/blog/BlogList'),
      },
      {
        path: ':id',
        name: 'code_blogdetail',
        component: () => import('@/views/blog/BlogDetail'),
      },
      {
        path: 'category:id',
        name: 'code_blogcategory',
        component: () => import('@/views/blog/BlogList'),
      },
    ]
  },
  //博客路由
  {
    path: '/archblog',
    component: Layout,
    children: [{
        path: '',
        name: 'archblog',
        component: () => import('@/views/blog/BlogList'),
      },
      {
        path: ':id',
        name: 'archblogdetail',
        component: () => import('@/views/blog/BlogDetail'),
      },
      {
        path: 'category/:id',
        name: 'archblogcategory',
        component: () => import('@/views/blog/BlogList'),
      },
    ]
  },
  //博客路由
  {
    path: '/codeblog',
    component: Layout,
    children: [{
        path: '',
        name: 'codeblog',
        component: () => import('@/views/blog/BlogList'),
      },
      {
        path: ':id',
        name: 'codeblogdetail',
        component: () => import('@/views/blog/BlogDetail'),
      },
      {
        path: 'category/:id',
        name: 'codeblogcategory',
        component: () => import('@/views/blog/BlogList'),
      },
    ]
  },
  //登录路由
  {
    path: '/',
    component: Layout,
    children: [{
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/Login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/login/Register'),
      }
    ]
  },
  //关于路由
  {
    path: '/about',
    component: Layout,
    children: [{
      path: '',
      name: 'about',
      component: () => import('@/views/about/About'),
    }]
  },
  //建筑路由
  {
    path: '/architecture',
    component: Layout,
    children: [{
      path: '',
      name: 'architecture',
      component: () => import('@/views/architecture/Architecture'),
    }]
  },
  //猜建筑路由
  {
    path: '/guess',
    component: Layout,
    children: [{
      path: '',
      name: 'guess',
      component: () => import('@/views/architecture/GuessArchitecture'),
    }]
  },
  //后台路由-首页
  {
    path: '/admin',
    component: LayoutAdmin,
    children: [{
        path: '',
        name: 'adminindex',
        component: () => import('@/views/admin/AdminIndex'),
      },
    ]
  },
  //后台路由-博客
  {
    path: '/admin/blog',
    component: LayoutAdmin,
    children: [{
        path: 'blog',
        name: 'adminblog',
        component: () => import('@/views/admin/blog/AdminBlogList'),
      },
      {
        path: ':id',
        name: 'adminblogdetail',
        component: () => import('@/views/admin/blog/AdminBlogDetail'),
      },
      {
        path: 'add',
        name: 'adminblogadd',
        component: () => import('@/views/admin/blog/AdminBlogDetail'),
      },
      {
        path: 'category',
        name: 'adminblogcategory',
        component: () => import('@/views/admin/blog/AdminBlogCategoryList'),
      },
      {
        path: 'category/:id',
        name: 'adminblogcategorydetail',
        component: () => import('@/views/admin/blog/AdminBlogCategoryDetail'),
      },
      {
        path: 'category/add',
        name: 'adminblogcategoryadd',
        component: () => import('@/views/admin/blog/AdminBlogCategoryDetail'),
      },
    ]
  },
  //后台路由-建筑
  {
    path: '/admin/architecture',
    component: LayoutAdmin,
    children: [{
        path: 'architecture',
        name: 'adminarchitecture',
        component: () => import('@/views/admin/architecture/AdminArchitectureList'),
      },
      {
        path: ':id',
        name: 'adminarchitecturedetail',
        component: () => import('@/views/admin/architecture/AdminArchitectureDetail'),
      },
      {
        path: 'add',
        name: 'adminarchitectureadd',
        component: () => import('@/views/admin/architecture/AdminArchitectureDetail'),
      },
      {
        path: 'architect',
        name: 'adminarchitecturearchitect',
        component: () => import('@/views/admin/architecture/AdminArchitectureArchitectList'),
      },
      {
        path: 'architect/:id',
        name: 'adminarchitecturearchitectdetail',
        component: () => import('@/views/admin/architecture/AdminArchitectureArchitectDetail'),
      },
      {
        path: 'architect/add',
        name: 'adminarchitecturearchitectadd',
        component: () => import('@/views/admin/architecture/AdminArchitectureArchitectDetail'),
      },
      {
        path: 'feature',
        name: 'adminarchitecturefeature',
        component: () => import('@/views/admin/architecture/AdminArchitectureFeatureList'),
      },
      {
        path: 'feature/:id',
        name: 'adminarchitecturefeaturedetail',
        component: () => import('@/views/admin/architecture/AdminArchitectureFeatureDetail'),
      },
      {
        path: 'feature/add',
        name: 'adminarchitecturefeatureadd',
        component: () => import('@/views/admin/architecture/AdminArchitectureFeatureDetail'),
      },
    ]
  },
  //后台路由-健康
  {
    path: '/admin',
    component: LayoutAdmin,
    children: [{
        path: 'health',
        name: 'adminhealth',
        component: () => import('@/views/admin/health/AdminHealthList'),
      },
      {
        path: 'health/:id',
        name: 'adminhealthdetail',
        component: () => import('@/views/admin/health/AdminHealthDetail'),
      },
      {
        path: 'health/add',
        name: 'adminhealthadd',
        component: () => import('@/views/admin/health/AdminHealthDetail'),
      },
    ]
  },
  //后台路由-说说
  {
    path: '/admin',
    component: LayoutAdmin,
    children: [{
        path: 'gossip',
        name: 'admingossip',
        component: () => import('@/views/admin/gossip/AdminGossipList'),
      },
      {
        path: 'gossip/:id',
        name: 'admingossipdetail',
        component: () => import('@/views/admin/gossip/AdminGossipDetail'),
      },
      {
        path: 'gossip/add',
        name: 'admingossipadd',
        component: () => import('@/views/admin/gossip/AdminGossipDetail'),
      },
    ]
  },
  //后台路由-日志
  {
    path: '/admin',
    component: LayoutAdmin,
    children: [{
        path: 'diary',
        name: 'admindiary',
        component: () => import('@/views/admin/diary/AdminDiaryList'),
      },
      {
        path: 'diary/:id',
        name: 'admindiarydetail',
        component: () => import('@/views/admin/diary/AdminDiaryDetail'),
      },
      {
        path: 'diary/add',
        name: 'admindiaryadd',
        component: () => import('@/views/admin/diary/AdminDiaryDetail'),
      },
    ]
  },
  //测试路由
  {
    path: '/test',
    component: Layout,
    children: [{
      path: '',
      name: 'test',
      component: () => import('@/views/test'),
    }]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  var reg = /^\/admin/
  //如果访问后台且没有登录
  if(reg.test(to.fullPath)&&!sessionStorage.isLogin){
    router.push('/login')
  }else{next()}
  
})
export default router