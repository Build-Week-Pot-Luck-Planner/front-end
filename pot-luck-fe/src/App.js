import React from 'react';
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

const NavBar = styled.header`
  box-shadow: 0 5px 10px black;
  display: flex;
  justify-content: center;
  background-color: lightgrey;
  padding-bottom: 10px;
`;

function App() {
  return (
    <div className="App">
      <NavBar>
        <Link to="/potlucks">Potlucks Page</Link>
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
  );
}

export default App;
