import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import {read_cookie} from 'sfcookies'
import { loginPostData } from "./actions";
import { FormErrors } from "./Components/FormErrors";
import "./App.css";
// import { withCookies } from "react-cookie";

class App extends Component {
  state = {
    person: {
      email: "",
      password: ""
    },
    formErrors: { email: "", password: "" },
    passwordValid: false,
    emailValid: false,
    formValid: false
  };
  onChangeHandler = event => {
    const person = { ...this.state.person };
    let inputName = event.target.name;
    let value = event.target.value;

    person[inputName] = value;
    this.setState({ person: person }, () => {
      this.validateField(inputName, value);
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  // if (res.data.success!== "Success")
  onSubmitHandler = () => {
    const values = this.state.person;

    this.props.loginPostData(values, res => {
      if (!res.data.status) {
        alert(res.data.message);
      }
      if (res.data.status) {
        alert(
          "Success",
          this.props.history.push("/hello", {
            data: res.data,
            header: res.headers
          })
        );
      }
    });
    // this.props.history.push("/hello", this.state);
  };
  render() {
    return (
      <div className="form-control">
        <h2>Log In</h2>
        <br />
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label htmlFor="email">Email Address</label>
          <input
            required
            name="email"
            onChange={this.onChangeHandler}
            placeholder="Enter Email"
          />
        </div>
        <br />
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <br />
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.password
          )}`}
        >
          <label htmlFor="password">Password</label>
          <input
            required
            name="password"
            onChange={this.onChangeHandler}
            placeholder="Enter Password"
          />
        </div>
        <br />
        <button
          disabled={!this.state.formValid}
          onClick={this.onSubmitHandler.bind(this)}
          className="btn btn-primary"
          type="submit"
        >
          LOGIN
        </button>
        <br />
        <Link to="/signup">Don't have account SignUp</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loginData: state.data };
};

export default connect(
  mapStateToProps,
  { loginPostData }
)(App);
