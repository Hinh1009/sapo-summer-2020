import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'
const HOMEPAGE = 'http://localhost:8080/'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handlePassWord = this.handlePassWord.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handlePassWord(e) {
        e.preventDefault()
        this.setState({ password: e.target.value })
    }
    handleEmail(e) {
        e.preventDefault()
        this.setState({ email: e.target.value })
    }
    handleClick() {
        let user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user)
        Axios.post('http://localhost:9000/api/auth/sign-in', user)
            .then(() => {
                // alert(`${this.state.email} login success`)
                window.location.href = HOMEPAGE
            })
            .catch((err) => {
                alert("Login failed", err)
            })
    }
    render() {
        return (
            <div>
                <div>Login</div>
                <input onChange={this.handleEmail} placeholder="Email" /> <br />
                <input onChange={this.handlePassWord} type="password" placeholder="Password" /> <br />
                <Link to="/register">Not have an account? Register now<br /></Link>
                <button onClick={this.handleClick}>Log in</button>

            </div>

        );
    }
}

export default Login;