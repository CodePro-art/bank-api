import React, { Component } from 'react';
import './Button.css'

export default class Button extends Component {
  render() {
    return (
      <button className={"bank-btn "+`${this.props.class}`} onClick={this.props.func}>
        {this.props.content}
      </button>
    )
  }
}
