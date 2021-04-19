import React, { Component } from 'react'
import { BiCopyright } from 'react-icons/bi';
import './Footer.css';

export default class Footer extends Component {
  
  render() {
    
    return (
      <footer className="footer-container">
        <BiCopyright/> 
        <p>This site was created by Netanel Mazuz</p>
      </footer>
    )
  }
}
