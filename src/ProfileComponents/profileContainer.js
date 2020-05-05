import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

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
    let {user:{list, username}} = this.props

    return (
      <div>
        <h2>{username}&apos;s Profile</h2>
        <h3>TGList</h3>

        {/* <ol>
          {list.map(restaurantObj => <List key={restaurantObj.id} s={snackObj} />)}
        </ol>
        <NewSnackForm token={this.props.token} addOneSnack={this.props.addOneSnack}/> */}
        <button onClick={this.handleClick}>Log out</button>
      </div>
    );
  }
}
export default withRouter(ProfileContainer);

// 10:05 check, to see why the create error is not showing