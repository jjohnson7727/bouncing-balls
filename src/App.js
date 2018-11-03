import React, { Component } from 'react';
import CanvasFX from './main/CanvasFX';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>bouncing balls</h1>
        <CanvasFX />
      </div>
    );
  }
}

export default App;
