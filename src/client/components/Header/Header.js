import React, { Component } from 'react';
import Searchbar from './Searchbar'
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header-container">
        <nav className="navbar">
          <a className="logo" href="/">
            <span className="primery">API</span>
            <span className="secondary">BANK</span>
          </a>
          <Searchbar/>
          <div className="right-side-nav">|
            <a href="/about/">About</a> |
            <a href="/login/">Login</a>
          </div>
        </nav>
      </header>
    )
  }
}
