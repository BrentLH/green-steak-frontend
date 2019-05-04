import React, { Component } from 'react';
import { HashRouter as Router, NavLink, Link } from 'react-router-dom';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3000/api/users/sign-in' , {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
          })
          .then((result) => result.json())
          .then((info) => { console.log(info); })
    }

    render() {
        return (
        <Router path="/users/sign-in">
          <div className="App__Form">
            <div className="PageSwitcher">
              <NavLink to="/users/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>          
            </div>
            <div className="FormTitle">
              <NavLink to="/users/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>
            <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormFields" method="POST" action="http://localhost:3000/api/users/sign-in">
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                    <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                 </div>

                <div className="FormField">
                   <label className="FormField__Label" htmlFor="password">Password</label>
                   <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>

                <div className="FormField">
                    <button className="FormField__Button mr-20">Sign In</button> <Link to="/" className="FormField__Link">Create an account</Link>
                </div>
              </form>
            </div>
          </div>
        </Router>
        );
    }
}

export default SignInForm;