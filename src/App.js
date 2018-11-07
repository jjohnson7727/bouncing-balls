import React, { Component } from 'react';
import Canvas from './main/Canvas';
import './App.css';

const TOTAL_BALLS = 25;
const TOTAL_TIME = 35;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: TOTAL_TIME,
      balls: TOTAL_BALLS,
      running: false,
      intervalID: 0
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className='noselect'>bouncing balls</h1>
        <p className='noselect'>Balls: {this.state.balls} Time: {this.state.time}</p>
        { this.makeStartButton() }
        <Canvas running={this.state.running} callback={() => this.handleScoreUpdate()}/>
      </div>
    );
  }

  handleScoreUpdate() {
    this.setState(state => {
      return {balls: state.balls - 1};
    })
  }

  handleStart() {
    this.setState({
      running: true,
      balls: 25,
      time: 30,
      intervalID: window.setInterval(() => this.timerCallback(), 1000)
    });
  }

  timerCallback() {
    const interval = this.state.time - 1;

    if(interval <= 0 || this.state.balls <= 0) {
      window.clearInterval(this.state.intervalID);
      this.setState({
        running: false,
        time: 0
      }, () => this.score());
    } else {
      this.setState({
        time: interval
      });
    }
  }

  score() {
    console.log('Ball score', (TOTAL_BALLS - this.state.balls) * 75);
    console.log('Time Remaining Bonus', this.state.time * 95);
    console.log('Zero Ball Bonus', this.state.balls <= 0 ? 500 : 0);
  }

  makeStartButton() {
    return this.state.running === false ? <button onClick={() => this.handleStart()}>START</button> : null;
  }
}

export default App;
