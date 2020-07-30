import React, { Component } from 'react';
import './App.css';
import Login from './components/login' ;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginUser: '',
      userList: [
        {
          userName: "hinhhwag",
          password: "123456"
        },
        {
          userName: "hinhhwag1",
          password: "123456"
        },
      ],
    };
    this.handleLogin = this.handleLogin.bind(this)
  }

  checkLoginSuccess(user) {
    let isSuccess = 0;
    this.state.userList.map((ele, index) => {
      if (ele.userName === user.userName) {
        if (ele.password === user.password)
          isSuccess = 1;
      }
    })
    return isSuccess;
  }

  handleLogin(user) {
    if (this.checkLoginSuccess(user) != 1) {
      alert("Wrong userName or password !");
      return;
    } else {
      this.setState({ loginUser: user.userName })
    }
    this.render();
  }

  render() {
    if (this.state.loginUser === '') {
      return (
        <div className="App">
          <Login onSubmit={this.handleLogin}
          />
        </div>
      );
    } else {
      return (
        <div >
          <span class="name">Hello {this.state.loginUser}. Welcome to first step reactJS</span><br />
        </div>
      );
    }
  }
}

export default App;