import React, { Component } from 'react';
import Welcome from './Welcome';
import styled from 'styled-components';

import './App.css';

import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';

const MyButton = styled.div`
  color: green;
`

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider> 
          <AppBar />
          <Welcome />
          <MyButton>hello</MyButton>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
