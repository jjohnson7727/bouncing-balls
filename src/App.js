import React, { Component } from 'react';
import Canvas from './main/Canvas';
import './App.css';

const TOTAL_BALLS = 75;
const TOTAL_TIME = 60;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: TOTAL_TIME,
      balls: TOTAL_BALLS,
      running: false,
      intervalID: 0,
      score: 0,
      message: 'Use aarow or asdw keys to move the evil circle and capture as many bouncing balls as you can!'
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className='hud-h1 output noselect'>bouncing balls</h1>
        <p className='hud-p output noselect'>Balls: {this.state.balls} Time: {this.state.time}</p>
        { this.makeInterface() }
        <Canvas balls={TOTAL_BALLS} running={this.state.running} callback={() => this.handleScoreUpdate()}/>
      </div>
    );
  }

  handleScoreUpdate(ball) {
    this.setState(state => {
      return { balls: state.balls - 1 };
    })
  }

  handleStart() {
    this.setState({
      running: true,
      balls: TOTAL_BALLS,
      time: TOTAL_TIME,
      intervalID: window.setInterval(() => this.timerCallback(), 1000)
    });
  }

  timerCallback() {
    const interval = this.state.time - 1;

    if(interval <= 0 || this.state.balls <= 0) {
      window.clearInterval(this.state.intervalID);
      const ball = (TOTAL_BALLS - this.state.balls) * 75;
      const time = this.state.time * 95;
      const win = this.state.balls <= 0 ? 500 : 0;

      this.setState({
        running: false,
        time: interval,
        score: ball + time + win
      });
    } else {
      this.setState({
        time: interval
      });
    }
  }

  makeStartButton() {
    return (<button onClick={() => this.handleStart()}>START</button>);
  }

  makeMessage() {
    return (<p className='output noselect'>{ this.state.message }</p>);
  }

  makeScore() {
    return this.state.score > 0 ? (<p className='output noselect'>Score: { this.state.score }</p>) : null;
  }

  makeInterface() {
    return this.state.running === false ? (<div className='interface center'>
      { this.makeScore() }
      <br/>
      { this.makeMessage() }
      <br/>
      { this.makeStartButton() }
    </div>) : null;
  }
}

export default App;
