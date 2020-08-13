

import AppRoot from './app-root';
import NotFound from '@components/ui/NotFound';
import Home from '@components/Home';

const routes = [
    {
        component: AppRoot,
        routes: [
            {
                path: '/',
                component:  Home ,
                exact: true
            },
            {
                path: '*',
                component: NotFound,
                restricted: false
            }
        ]
    }
];

export default routes;
