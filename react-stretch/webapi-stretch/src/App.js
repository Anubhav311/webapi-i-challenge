import React, {Component} from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    users: [],
    id: '',
    name: '',
    bio: ''
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res)
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  changeHandler = (e) => {
    e.preventDefault()
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  addUser = () => {

  }

  render() {
    console.log(this.state.users)
    return (
      <div>
        <form>
          <input
            type="text"
            name="id"
            placeholder="id"
            value={this.state.id}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="bio"
            placeholder="bio"
            value={this.state.bio}
            onChange={this.changeHandler}
          />
          <button onClick={this.addUser}>Add User</button>
        </form>
        {this.state.users.map(user => (
          <div>
            <h2>{user.name}</h2>
            <h3>{user.bio}</h3>
          </div>
        ))}
      </div>
    )
  }
}

export default App;
