import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
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
        <h1>Placeholder login bar</h1>
      </NavBar>

   


      <Switch>
          <Route exact path="/">
          <UserPotluckPage /> 
          </Route>
          <Route  path="/signup" >
            <SignUp />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
