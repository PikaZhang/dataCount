import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/Index'
    }, {
        path: '/index',
        name: 'Index',
        component: Index
    }]
})