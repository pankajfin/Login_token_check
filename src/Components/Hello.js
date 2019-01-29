import React, { Component } from "react";
//import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { detailFetch } from "../actions";
//import { withCookies } from "react-cookie";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";

class Hello extends Component {
  state = {
    token: null
  };
  
  componentDidMount() {
    const abc = this.props.location.state;
    if (abc !== undefined) {
      const token = abc.header["x-auth-token"];
      this.setState({ token: token });
      localStorage.setItem(abc.data.user_email, JSON.stringify(token));
      let cookie_value = localStorage.getItem(abc.data.user_email);
      bake_cookie(abc.data.user_email, cookie_value);
    } else {
      alert("Please Login First", this.props.history.push("/"));
    }
  }

  clearLocalStorage() {
    localStorage.removeItem(this.props.location.state.data.user_email);
  }

  onClickHandler() {
    let cookie_data = read_cookie(this.props.location.state.data.user_email);
    console.log("READ COOKIE ", cookie_data);
    if (cookie_data.length !== 0) {
      this.props.detailFetch(JSON.parse(cookie_data), res => {
        if (res.success) {
          console.log("SUCCESSS")
          this.props.history.push("/second",res.user);
        }
        else{
          alert("Something went wrong try again");
          console.log("TOKEN NOT AVAILABLE")
          this.props.history.push("/")
        }
      });
    } else {
      this.props.history.push("/");
      console.log("NO COOKIES FOUND");
    }
  }

  clearCookie = () => {
    delete_cookie(this.props.location.state.data.user_email);
  };

  render() {
    return (
      <div>
        <div>
          <button
            className="btn btn-danger"
            onClick={this.clearLocalStorage.bind(this)}
          >
            DESTROY LOCAL STORAGE
          </button>
          <button onClick={() => this.onClickHandler()}>SECOND</button>
          <button onClick={() => this.clearCookie()}>Clear Cookie</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(
  mapStateToProps,
  { detailFetch }
)(Hello);
