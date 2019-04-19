import React, { Component } from 'react';
import Welcome from './Welcome';
import styled from 'styled-components';

import './App.css';

import AppLayout from './AppLayout';
import AppBar from './AppBar';

const MyButton = styled.div`
  color: green;
`

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppBar />
        <Welcome />
        <MyButton>hello</MyButton>
      </AppLayout>
    );
  }
}

export default App;
