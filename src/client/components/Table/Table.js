import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import './Table.css';

let arr = [];

export default class Table extends Component {

  state = { 
    users: [{}],
    transferTo: 0,
  }

  componentDidMount(){
    const users = [];
    axios.get('/api/users').then(res =>{
      res.data.forEach(u => users.push(u));
      this.setState({users: users});
      this.state.users.map(u => {
        arr.push({ id: u.id, value:0 }) 
      })
    }).catch(function (error) {console.log(error)});
  }

  componentDidUpdate(){
    let temp = [];
    this.state.users.map(u => {
      let index = arr.findIndex(e=>{e.id===u.id});
      let value = index !== -1 ? arr[index].value : 0;
      temp.push({ id: u.id, value: value }) 
    })
    
    console.log(arr);
  }

  renderTableHeader = () => {
    let header = Object.keys(this.state.users[0])
    return header.map((key, index) => key==="isActive" ? <th key={index}>{"ACTION"}</th> :<th key={index}>{key.toUpperCase()}</th>)
  }

  deposit = id => {
    let index = arr.findIndex(e=>e.id===id);
    let value = arr[index].value;
    axios.put('/api/users/deposit/'+id,{value: value}).then(res =>{
      this.setState({users: res.data})
    }).catch(function (error) {console.log(error)});
  }

  withdraw = id => {
    let index = arr.findIndex(e=>e.id===id);
    let value = arr[index].value;
    axios.put('/api/users/withdraw/'+id,{value: value}).then(res =>{
      this.setState({users: res.data})
    }).catch(function (error) {console.log(error)});
  }

  updateCredit = id => {
    let index = arr.findIndex(e=>e.id===id);
    let value = arr[index].value;
    axios.put('/api/users/updateCredit/'+id,{value: value}).then(res =>{
      this.setState({users: res.data})
    }).catch(function (error) {console.log(error)});
  }

  remove = id => {
    axios.delete('/api/users/remove/'+id).then(res =>{
      this.setState({users: res.data})
    }).catch(function (error) {console.log(error)});
  }

  transfer = src => {
    let index = arr.findIndex(e=>e.id===src);
    let value = arr[index].value;
    let dst = this.state.transferTo;
    
    axios.put('/api/users/transfer/'+src +`/${dst}`,{value: value}).then(res =>{
      this.setState({users: res.data})
    }).catch(function (error) {console.log(error)});
  }

  updateTransferDestination = e => this.setState({transferTo: e.target.value})

  updateAmount = (e,id) => {
    arr[arr.findIndex(e => e.id ===id)].value = e.target.value;
    console.log(arr.find(e => e.id ===id).value);
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
            <input className="value-input" type="text" placeholder="amount..." defaultValue="0" onChange={(e)=>{this.updateAmount(e,id)}}/>
            <Button class={"deposit"} content={"deposit"} func={() => {this.deposit(id)}}/>
            <Button class={"withdraw"} content={"withdraw"} func={() => {this.withdraw(id)}}/>
            <Button class={"remove"} content={"remove"} func={() => {this.remove(id)}}/>
            <Button class={"update credit"} content={"update credit"} func={() => {this.updateCredit(id)}}/>
            <Button class={"transfer"} content={"transfer"} func={() => {this.transfer(id)}}/>
          </td>
        </tr>
      )
    })
   }

  render() {
    return (
      <div className="table-container">
        <h1 className='title'>Table of clients</h1>
        <label htmlFor="">Transfer to: </label>
        <input className={"id-input"} type="number" placeholder="id" min="0" defaultValue="0" onChange={(e)=>{this.updateTransferDestination(e)}}/>
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
