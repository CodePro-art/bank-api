import React, { Component } from 'react';
import Button from '../Button/Button';
import Table from '../Table/Table';
import './Main.css';

export default class Main extends Component {

  render() {
    return (
      <main className="main-container">
        <Table/>
        <Button content={"click me"}/>
      </main>
    )
  }
}
