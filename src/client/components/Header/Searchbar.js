import React, { Component } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import './Searchbar.css';

export default class Searchbar extends Component {
  render() {
    return (
      <div className="searchbar-container">
        <input className="search-input" type="text" id="searchbar" placeholder="Search..."/>
        <button className="search-btn"><BiSearchAlt size={30}/></button>
      </div>
    )
  }
}
