import { MetaProvider } from '@solidjs/meta';
import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';
import Pages from './pages';

const App: Component = () => {
  return (
    <MetaProvider>
    <Router>
      <Route>
        <Pages/>
      </Route>
    </Router>
    </MetaProvider>
  );
};

export default App;
