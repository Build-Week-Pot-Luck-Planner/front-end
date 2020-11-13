import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import UserPotluckPage from './components/UserPotluckPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import styled from 'styled-components';
import data from "./data";
import { PotluckContext } from './contexts/PotluckContext';

const NavBar = styled.header`
  box-shadow: 0 5px 10px black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: lightgrey;
  padding-bottom: 10px;
  height: 50px;
`;

function App() {

  const [potluckData, setPotluckData] = useState(data);

  return (
    <PotluckContext.Provider value={potluckData}>
      <div className="App">
        <NavBar>
          <Link to="/potlucks">Potlucks Page</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </NavBar>

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/potlucks" component={UserPotluckPage} />
        </Switch>
      </div>
      </PotluckContext.Provider>
  );
}

export default App;
