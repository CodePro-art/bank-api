import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import './Table.css';

export default class Table extends Component {

  state = { 
    users: [{}]
  }

  componentDidMount(){
    const users = [];
    axios.get('/api/users').then(res =>{
      res.data.forEach(u => users.push(u));
      this.setState({users: users})
    }).catch(function (error) {console.log(error)});
  }

  renderTableHeader = () => {
    let header = Object.keys(this.state.users[0])
    return header.map((key, index) => key==="isActive" ? <th key={index}>{"ACTION"}</th> :<th key={index}>{key.toUpperCase()}</th>)
  }

  eventhandler = () => {
    axios.get('/api/users').then(res =>{
      res.data.forEach(u => users.push(u));
      this.setState({users: users})
    }).catch(function (error) {console.log(error)});
  }

  renderTableData = () => {
    return this.state.users.map((user,index) => {
      const { id, name, cash, credit } = user //destructuring
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{cash}</td>
          <td>{credit}</td>
          <td>
            <input className="value-input" type="text" placeholder="amount..."/>
            <Button class={"deposit"} content={"deposit"} func={this.eventhandler}/>
            <Button class={"withdraw"} content={"withdraw"} func={this.eventhandler}/>
            <Button class={"remove"} content={"remove"} func={this.eventhandler}/>
          </td>
        </tr>
      )
    })
   }

  render() {
    return (
      <div className="table-container">
        <h1 className='title'>Table of clients</h1>
        <table className='users'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    )
  }
}
