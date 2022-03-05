import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import ButtonShowdata from "../showdata/ButtonShowdata";
import ButtonRegister from "../register/ButtonRegister";
import './style.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from "../register/Register";
import Showdata from "../showdata/Showdata";

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };
  responseFacebook = response => {
    // Login เก็บข้อมูล response ลง LocalStorage
    localStorage.setItem('user',JSON.stringify(response))
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  componentClicked = () => console.log("Login facebook successfuly");

  logoutFacebook = () => {
    // เมื่อทำการ Logout จะทำการลบ key user
    localStorage.removeItem('user')
    this.setState({
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: ''
    });
  }

  render() {
    let fbContent;
    // ทำการเช็คข้อมูล LOcalStorage ว่ามีการ ล็อกอินเข้าหรือไม่
    if (localStorage.getItem('user')!== null) {
      fbContent = (
        <div
          style={{
            width: "95%",
            margin: "auto",
            background: "black",
            color: 'black',
            padding: "25px",
            position: 'absolute',
            zIndex: 99,
            background: 'linear-gradient(120deg, rgba(0,91,234,1) 0%, rgba(0,198,251,1) 100%)'
          }}
        >
          <img src={JSON.parse(localStorage.getItem('user')).picture.data.url} alt />
          <h2>Welcome {" "}{JSON.parse(localStorage.getItem('user')).name}</h2>
 	        email: {JSON.parse(localStorage.getItem('user')).email}
          <div className="my-3"><a className="btn btn-danger" href="/" onClick={this.logoutFacebook}>Logout</a></div>
          <BrowserRouter>
            <br /><br /><div className="btn-group btn-group-lg"><ButtonRegister /><ButtonShowdata /></div>
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/showdata' component={Showdata} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    } else {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            padding: "25px"
          }}
        >
          <FacebookLogin
            appId="353408999869591"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </div>
      );
    }

    return <div>{fbContent}</div>;
  }
}