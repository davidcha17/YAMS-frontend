import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import List from './list'

// create a list for restaurants
// create a form for adding restaurant to list
// show a list of restaurants

class ProfileContainer extends Component {

  componentDidMount() {
    if(!this.props.token){
      this.props.history.push("/login")
    }
  }


  handleClick = (e) => {
    console.log("you are now logging out");
    e.preventDefault()
    this.props.handleLogout()
}

  render() {
    // console.log(this.props.lists, "this is the list")
    // console.log(this.props.user.lists, "user's list")
    // console.log(this.props.user.username)

    let {user:{lists, username}} = this.props

    let arrayOfRestaurants = this.props.lists.map( list => {
      return <List key={list.id} list={list} name={list.restaurant} token={this.props.token} deleteRestaurant={this.props.deleteRestaurant}/>
    })

    return (
      <div className="profile-container" >
        <h2>{username}&apos;s Profile</h2>
        <button onClick={this.handleClick}>Log out</button>
        <h3>TGList</h3>
          {arrayOfRestaurants}
      </div>
    );
  }
}
export default withRouter(ProfileContainer);

// 10:05 check, to see why the create error is not showing