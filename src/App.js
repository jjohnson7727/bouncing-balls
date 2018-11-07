import React, { Component } from 'react';
import Canvas from './main/Canvas';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      remaining: 25
    }
  }

  render() {
    return (
      <div className="App">
        <h1>bouncing balls</h1>
        <p>Remaining: {this.state.remaining}</p>
        <Canvas callback={() => this.handleScoreUpdate()}/>
      </div>
    );
  }

  handleScoreUpdate() {
    this.setState(state => {
      return {remaining: state.remaining - 1};
    })
  }
}

export default App;
