import React, { Component } from 'react';
import Button from '../Button/Button';
import './Main.css';

export default class Main extends Component {

  render() {
    return (
      <main className="main-container">
        <Button content={"click me"}/>
      </main>
    )
  }
}
