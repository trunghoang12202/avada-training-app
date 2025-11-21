import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '@assets/loadables/Home/Home';
import Notifications from '@assets/loadables/Notifications/Notifications';
import Settings from '@assets/loadables/Settings/Settings';
import NotFound from '@assets/loadables/NotFound/NotFound';
import Loading from '@assets/components/Loading';
import {routePrefix} from '@assets/config/app';
import PropTypes from 'prop-types';

const Routes = ({prefix = routePrefix}) => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* <Redirect from="/" to={prefix + '/'} />*/}
        <Route exact path={prefix + '/'} component={Home} />
        <Route exact path={prefix + '/home'} component={Home} />
        <Route exact path={prefix + '/notifications'} component={Notifications} />
        <Route exact path={prefix + '/settings'} component={Settings} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {
  prefix: PropTypes.string
};

export default Routes;
