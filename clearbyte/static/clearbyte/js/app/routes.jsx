import React from 'react';
import {Redirect, Route, IndexRoute, IndexRedirect} from 'react-router';
import App from './views/app';

function appendTrailingSlash(nextState, replaceState) {
  let lastChar = nextState.location.pathname.slice(-1);
  if (lastChar !== '/') {
    replaceState(nextState, nextState.location.pathname + '/');
  }
}

function routes(){
return (
    <Route path="/" component={App} exact={false}>
        <Route path="/company/search/:domainName/" component={App} />
        <Route
        path="*"
        onEnter={appendTrailingSlash}
      />
    </Route>
    
)
}

export default routes
