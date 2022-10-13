import { createRouter, createWebHashHistory } from 'vue-router';
import KanbanBoard from '../pages/KanbanBoard.vue';
import ChartBoard from '../pages/ChartBoard.vue';

const routerHistory = createWebHashHistory()


const routes = [
    { path: '/', component: KanbanBoard },
    { path: '/chart-board', component: ChartBoard }
]

const router = createRouter({
    history: routerHistory,
    routes
})

export default router