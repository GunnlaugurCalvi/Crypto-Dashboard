import React, { Component } from 'react';
import styled from 'styled-components';

import './App.css';

import Settings from '../Settings';
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
          <Settings />
          <MyButton>hello</MyButton>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
