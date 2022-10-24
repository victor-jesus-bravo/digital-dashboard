import { createRouter, createWebHashHistory } from 'vue-router';

import RequirementsKanbanBoard from '../pages/requirements/RequirementsKanbanBoard.vue';
import RequirementsChartBoard from '../pages/requirements/RequirementsChartBoard.vue';
import RequirementsTable from '../pages/requirements/RequirementsTable.vue';
import RequirementForm from '../pages/requirements/RequirementForm.vue';

import IncidentsKanbanBoard from '../pages/incidents/IncidentsKanbanBoard.vue';
import IncidentsTable from '../pages/incidents/IncidentsTable.vue';
import IncidentsChartBoard from '../pages/incidents/IncidentsChartBoard.vue';
import IncidentForm from '../pages/incidents/IncidentsForm.vue';

const routerHistory = createWebHashHistory()


const routes = [
    { path: '/', component: RequirementsKanbanBoard },
    { path: '/reqs-chart-board', component: RequirementsChartBoard },
    { path: '/reqs-table', component: RequirementsTable },
    { path: '/request-requirement', component: RequirementForm },
    
    { path: '/inc-kanban', component: IncidentsKanbanBoard },
    { path: '/inc-table', component: IncidentsTable },
    { path: '/inc-chart-board', component: IncidentsChartBoard },
    { path: '/request-incident', component: IncidentForm }
]

const router = createRouter({
    history: routerHistory,
    routes,
    strict: true
})

export default router