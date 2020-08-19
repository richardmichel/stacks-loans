import AppRoot from './app-root';
import NotFound from '@components/ui/NotFound';
import Home from '@pages/Home';
import About from '@pages/About';

const routes = [
    {
        component: AppRoot,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                path: '/about',
                component: About,
                restricted: false
            }, {
                path: '*',
                component: NotFound,
                restricted: false

            }
        ]
    }
];

export default routes;
