import React from 'react';
import UserPotluckPage from './components/UserPotluckPage';
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
      <UserPotluckPage />
    </div>
  );
}

export default App;
