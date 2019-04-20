import React, { Component } from 'react';
import styled from 'styled-components';

import './App.css';

import Settings from '../Settings';
import Dashboard from '../Dashboard';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';
import Content from '../Shared/Content';
const MyButton = styled.div`
  color: green;
`

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider> 
          <AppBar />
          <Content>
            <Settings />
            <Dashboard />
          </Content>
          <MyButton></MyButton>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
