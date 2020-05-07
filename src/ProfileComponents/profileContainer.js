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


  handleClick = () => {
    console.log("you are now logging out");
    let key = this.props.token
    this.props.handleLogout()
    // the token has been cleared out but the profileContainer still has instance data about the logged out user
}

  render() {
    console.log(this.props.lists, "this is the list")
    let {user:{list, username}} = this.props

    let arrayOfRestaurants = this.props.lists.map( list => {
      return <List key={list.id} list={list} name={list.name} />
    })

    return (
      <div>
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