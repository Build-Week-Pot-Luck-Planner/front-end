import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/SignUp';
import Login from './components/Login';
import styled from 'styled-components';
import data from "./data";
import { PotluckContext } from './contexts/PotluckContext';
import UserPotluckPage from './components/UserPotluckPage';
import NewPotluckForm from './components/NewPotluckForm';
import EditUserForm from './components/EditUserForm';
import GuestInvite from './components/GuestInvite';
import axiosWithAuth from './utils/axiosWithAuth';
import PotluckDetailsPage from './components/PotluckDetailsPage';

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
  const links = [{
    route: "/potlucks",
    text: "Potlucks Page"
  }, {
    route: "/login",
    text: "Login"
  }, {
    route: "signup",
    text: "Signup"
  }]

  // const [potluckData, setPotluckData] = useState(data);
  const [userId, setUserId] = useState(null);
  const userIdSetter = state => {
    setUserId(state);
  }

  const [userData, setUserData] = useState({});
   const userDataSetter = (state) => {
     setUserData(state);
   };

  return (
    <PotluckContext.Provider
      value={{ 
        userData: userData, 
        userIdSetter: userIdSetter, 
        userDataSetter: userDataSetter,
      }}
    >
      <div className="App">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Potluck</NavbarBrand>
        <NavbarToggler  />
      
          <Nav className="mr-auto" navbar>
            {links.map((e) => {
            return (
              <Link to={e.route} >
              <NavItem>
                <NavLink>
                 {e.text}
                 </NavLink>
              </NavItem>
              </Link>
            )
          })}


          </Nav>
      </Navbar>

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
          <PrivateRoute
            exact
            path="/potlucks"
            component={UserPotluckPage}
            setUserData={setUserData}
          />
          <PrivateRoute exact path="/potlucks/:potluckId" component={PotluckDetailsPage}/>
          <PrivateRoute exact path="/newPotluck" component={NewPotluckForm} />
          <PrivateRoute exact path="/editUser/:id" component={EditUserForm} />
          <PrivateRoute exact path="/invite/:id" component={GuestInvite} />
        </Switch>
      </div>
    </PotluckContext.Provider>
  );
}

export default App;
