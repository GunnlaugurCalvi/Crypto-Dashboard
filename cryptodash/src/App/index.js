import React, { Component } from 'react';
import Welcome from './Welcome';
import styled from 'styled-components';
import './App.css';

const MyButton = styled.div`
  color: green;
`

class App extends Component {
  render() {
    return (
      <div>
        <Welcome />
        <MyButton>hello</MyButton>
      </div>
    );
  }
}

export default App;
