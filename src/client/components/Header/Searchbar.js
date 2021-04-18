import React, { Component } from 'react';
import { FcSearch } from "react-icons/fc";

export default class Searchbar extends Component {
  render() {
    return (
      <div className="searchbar-container">
        <input className="search-input" type="text" id="searchbar" placeholder="Search..."/>
        <button className="search-btn"><FcSearch size={35}/></button>
      </div>
    )
  }
}
