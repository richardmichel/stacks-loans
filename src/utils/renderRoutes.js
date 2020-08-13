import React from 'react';
import {Switch} from 'react-router-dom'
import {Route, Redirect} from 'react-router-dom'

const renderRoutes = (routes, authed, authPath, extraProps = {}, switchProps = {}) => routes ? (
    <Switch {...switchProps}>
        {
            routes.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={(props) => {

                        if (!route.restricted || authed || route.path === authPath) {
                            return <route.component {...props} {...extraProps} route={route}/>
                        }
                        const redirectPath = authPath ? authPath : '/login';

                        return <Redirect to={{pathname: redirectPath, state: {from: props.location}}}/>
                    }
                    }
                />
            ))
        }
    </Switch>

) : null;

export default renderRoutes