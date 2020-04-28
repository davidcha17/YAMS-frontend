import React from 'react';
import './App.css';
import Home from './mapboxWithReact/home.js'
import {Switch, Route} from 'react-router-dom'
import Form from './Components/Form.js'
import NavBar from './Components/NavBar.js'
import ProfileContainer from './ProfileComponents/profileContainer.js'

import {withRouter} from 'react-router-dom'

class App extends React.Component{
  
  // I need to combine the routing and mapbox, the home will be the mapbox component

  state = {
    viewport: {
      latitude: 40.7009,
      longitude: -73.9975,
      zoom: 13,
      width:'100vw',
      height: "100vh"
    },
    user: {
      lists: [],
      username: "",
      id: 0
    },
    token: ""
  }
  

  onViewportChanged = (point) => {
    this.setState({
      viewport: point
    })
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {

      fetch("http://localhost:4000/persist", {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(this.handleResp)
    }
  }


  handleResp = (resp) => {
    if (resp.user) {
      localStorage.token = resp.token
      this.setState(resp, () => {
        this.props.history.push("/profile")
      })
    }
    else {
      alert(resp.error)
    }
  }

  handleLoginSubmit = (userInfo) => {
    // debugger
    return fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(this.handleResp)
  }

  handleRegisterSubmit = (userInfo) => {
    return fetch(`http://localhost:4000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(this.handleResp)
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  renderProfile = (routerProps) => {
    return <ProfileContainer user={this.state.user} token={this.state.token} />
  }

  handleLogout = (e) => {
    localStorage.clear()
    return <Route path="/" exact render={() => <Home viewport={this.state.viewport} onViewportChanged={this.onViewportChanged} /> } />
    // token is clearing but we need to render it to the home page after user logs out
  }



  
  render() {
    // console.log(this.state)
    return (
      <div className="App">
        <NavBar token={this.state.token} handleLogout={this.handleLogout} />
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/profile" render={ this.renderProfile } />
          <Route path="/" exact render={() => <Home viewport={this.state.viewport} onViewportChanged={this.onViewportChanged} /> } />
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
  );
}
}


export default withRouter(App);
