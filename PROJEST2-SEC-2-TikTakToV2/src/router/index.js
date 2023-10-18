import { createRouter, createWebHistory } from 'vue-router'
import Slot from '../components/Slot.vue'
import AccountManagement from '../components/AccountManagement.vue'

const router = createRouter(
    {
    history:createWebHistory(),
    routes:
    [
        {
            path:'/',
            redirect:'/account'
        },
        {
            path:'/slot',
            name:'Slot',
            component: Slot
        },
        {
            path:'/account',
            name:'AccountManagement',
            component:AccountManagement
        }
    ]}
    )

export default router