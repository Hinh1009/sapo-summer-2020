import React, { Component } from 'react';


class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      password: "",
    }
    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeUserName(event) {
    this.setState({ userName: event.target.value })
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value })
  }
  handleSubmit(event) {
    if(this.state.userName.trim() ==='' ){
      alert("userName is invalid !");
      return;
    }
    if(this.state.password.trim() ==='' ){
      alert("password is invalid !");
      return;
    }
    this.props.onSubmit(this.state)
    this.setState({
      userName: "",
      password: "",
    })
  }

  render() {
    return (
      <div className="LoginForm">
        <div>
          <input
            type="text"
            className="userName"
            placeholder="user name"
            value={this.state.userName}
            onChange={this.handleChangeUserName}
          />
        </div>
        <div>
          <input
            type="password"
            className="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
        </div>
        <div>
          <button
            className="button"
            onClick={this.handleSubmit}
          >
            Log in
          </button>
        </div>
      </div>
    )
  }
}

export default LoginForm;