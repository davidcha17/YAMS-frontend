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
      zoom: 15,
      width:'100vw',
      height: "100vh"
    },
    user: {
      lists: [],
      username: "",
      id: 0
    },
    lists: [],
    token: "",
    restaurantCollections: [],
    selectedRestaurant: null
  }



  addOneRestaurantToList = (restObj, selectedRestaurant) => {
    // console.log(restObj)
    let copyOfUser = {
      ...this.state.user,
      lists: [...this.state.user.lists, restObj]
    }
      this.setState({
        user: copyOfUser,
        lists: [...this.state.lists, selectedRestaurant]
      })
  }


  // see how we can transfer the props into the home component and utilize mapbox keywords in order to show the props

  setSelectedRestaurant = (restObj) => {
    // console.log("Click on the controlled")
    this.setState({
      selectedRestaurant: restObj
    })
    // console.log(!this.state.restaurantCollections.selectedRestaurant)
  }

  deselectRestaurant = (restObj) => {
    this.setState({
      selectedRestaurant: !restObj
    })
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

    fetch("http://localhost:4000/restaurants", {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then( res => res.json())
    .then( restaurantData => {
      this.setState({
        restaurantCollections: restaurantData
      })
    })

    if (localStorage.getItem("token")) {

    fetch("http://localhost:4000/lists", {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then( listData => {
        this.setState({
          lists: listData
        })
      })
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

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  renderProfile = (routerProps) => {
    return <ProfileContainer 
    user={this.state.user} 
    token={this.state.token} 
    handleLogout={this.handleLogout} 
    lists={this.state.lists}
    />
  }

  handleLogout = (e) => {
    localStorage.clear()
    return <Route path="/" exact render={() => <Home viewport={this.state.viewport} onViewportChanged={this.onViewportChanged} /> } />
    // token is clearing but we need to render it to the home page after user logs out
  }



  
  render() {
    // console.log(this.state)
    // console.log(this.state.selectedRestaurant)
    console.log(this.state.user.lists, "user's lists")
    console.log(this.state.lists, "list")
    // console.log(this.state.user.lists.last, "last")

    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/profile" render={ this.renderProfile } />
          <Route path="/" exact render={() => <Home 
            viewport={this.state.viewport} 
            onViewportChanged={this.onViewportChanged} 
            arrayOfRestaurants={this.state.restaurantCollections} 
            selectedRestaurant={this.state.selectedRestaurant} 
            setSelectedRestaurant={this.setSelectedRestaurant}
            deselectRestaurant={this.deselectRestaurant}
            token={this.state.token}
            addOneRestaurantToList={this.addOneRestaurantToList}
            user_id={this.state.user.id}
            />}  
          />
        <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
  );
}
}


export default withRouter(App);
