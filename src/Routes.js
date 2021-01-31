import React from 'react';
import Categories from './screens/Categories/Categories';
import Meals from './screens/Meals/Meals';
import Recipe from './screens/Recipe/Recipe';

import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/Categories" component={Categories} />
      <Route exact path="/">
        <Redirect to="/Categories" />
      </Route>
      <Route exact path="/Meals/:id" component={Meals} />
      <Route exact path="/Recipe/:id" component={Recipe} />
    </Switch>
  );
};