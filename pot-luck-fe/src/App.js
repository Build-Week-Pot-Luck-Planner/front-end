import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
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

  // useEffect(() => {
  //   console.log(userId);
  //   axiosWithAuth()
  //     .get(`https://bw-potluckplanner.herokuapp.com/api/users/${userId}`)
  //     .then(res => {
  //       console.log("This is from App.js", res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }, [userId])

  return (
    <PotluckContext.Provider
      value={{ 
        userData: userData, 
        userIdSetter: userIdSetter, 
        userDataSetter: userDataSetter,
      }}
    >
      <div className="App">
        <NavBar>
          {/* <Link to="/potlucks">Potlucks Page</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link> */}
          {links.map((e) => {
            return <Link to={e.route}>{e.text} </Link>;
          })}
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
          <PrivateRoute
            exact
            path="/potlucks"
            component={UserPotluckPage}
            setUserData={setUserData}
          />
          <PrivateRoute exact path="/newPotluck" component={NewPotluckForm} />
          <PrivateRoute exact path="/editUser/:id" component={EditUserForm} />
          <PrivateRoute exact path="/invite" component={GuestInvite} />
        </Switch>
      </div>
    </PotluckContext.Provider>
  );
}

export default App;
