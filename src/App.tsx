import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./Router/Home";
import Header from './Components/Header';
import Tv from './Router/Tv';
import Search from './Router/Search';


function App() {

  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header /> 
      <Switch>
        <Route path={["/tv", "/tv/:category/:tvId"]} >
            <Tv />
        </Route>
        <Route path={["/search", "/search/movie/:movieId", "/search/tv/:tvId"]} > 
          <Search />
        </Route>
        <Route path={["/", "/movie/:category/:movieId"]}  >
          <Home />
        </Route>          
      </Switch>
    </BrowserRouter>
  )
};

export default App; 
