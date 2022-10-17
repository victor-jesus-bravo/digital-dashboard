import { createRouter, createWebHashHistory } from 'vue-router';
import KanbanBoard from '../pages/requirements/KanbanBoard.vue';
import ChartBoard from '../pages/requirements/ChartBoard.vue';
import RequirementsTable from '../pages/requirements/RequirementsTable.vue';

const routerHistory = createWebHashHistory()


const routes = [
    { path: '/', component: KanbanBoard },
    { path: '/chart-board', component: ChartBoard },
    { path: '/reqs-table', component: RequirementsTable }
]

const router = createRouter({
    history: routerHistory,
    routes
})

export default router