import { createRouter, createWebHashHistory } from 'vue-router';
import NextLaunch from './components/NextLaunch.vue';
import HomePage from './pages/HomePage.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/next',
            component: NextLaunch
        }
    ]
});

export default router;