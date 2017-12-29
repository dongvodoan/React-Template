import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";

import HomeView from './views/Home';
import { CatalogView, ProductView } from './views/Catalog';
import { NestedView } from './views/Nested';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import Protected from './views/Protected';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Route exact path="/" component={HomeView} />
                <Route path="/another" component={() => <div>yo!</div>} />
                <Route path="/catalog" component={CatalogView} />
                <Route path="/product/:id" component={ProductView} />
                <Route path="/nested" component={NestedView} />
                <PrivateRoute path="/protected" component={Protected} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
