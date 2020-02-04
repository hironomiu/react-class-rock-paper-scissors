import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

let title = "じゃんけん";

function mappingState(state) {
  return state;
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>{title}</h1>
        <hr />
        <OpponentHand />
        <Result />
        <MyHand />
        <Button />
      </div>
    );
  }
}

App = connect()(App);

class OpponentHand extends Component {
  render() {
    return (
      <img src={`${process.env.PUBLIC_URL}/images/` + this.props.opsrc + ".png"} alt={this.props.opsrc} />
    );
  }
}

OpponentHand = connect(mappingState)(OpponentHand);

class Result extends Component {
  render() {
    return (
      <h2>{this.props.judge}</h2>
    );
  }
}

Result = connect(mappingState)(Result);

class MyHand extends Component {
  render() {
    return (
      <img src={`${process.env.PUBLIC_URL}/images/` + this.props.src + ".png"} alt={this.props.src} />
    );
  }
}

MyHand = connect(mappingState)(MyHand);

class Button extends Component {
  constructor(props) {
    super(props);
    this.rockAction = this.rockAction.bind(this);
    this.scissorsAction = this.scissorsAction.bind(this);
    this.paperAction = this.paperAction.bind(this);
  }

  rockAction(e) {
    this.props.dispatch({ type: 'rock' });
  }

  scissorsAction(e) {
    this.props.dispatch({ type: 'scissors' });
  }

  paperAction(e) {
    this.props.dispatch({ type: 'paper' });
  }

  render() {
    return (
      <div>
        <br />
        <button onClick={this.rockAction} value="rock" ><img src={`${process.env.PUBLIC_URL}/images/rock.png`} alt="rock" /></button>
        <button onClick={this.scissorsAction} value="scissors" ><img src={`${process.env.PUBLIC_URL}/images/scissors.png`} alt="scissors" /></button>
        <button onClick={this.paperAction} value="paper" ><img src={`${process.env.PUBLIC_URL}/images/paper.png`} alt="paper" /></button>
      </div>
    );
  }
}

Button = connect()(Button);


export default App;
