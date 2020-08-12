import React from 'react';

// this will show the user's list 

const List = (props) => {


  const handleDeleteClick = (e) => {
    e.preventDefault()
    console.log("deleting")
    props.deleteRestaurant(props.list.id)
  }



  // console.log(props.list)

  let { name, image_url, url, distance, transactions, address, price, kind_of_food, phone } = props.list.restaurant

  console.log(props.list, "list instance")
  // console.log(props.list.restaurant, "individual restaurants")

  return(
    <div className="restaurant" >
      <h4>{name}</h4>
      <img src={image_url} alt={name} />
      <ul>Url: <a href={url}>{name}'s website</a> </ul>
      <ul>Address: {address}</ul>
      <ul>Serves: {kind_of_food}</ul>
      <ul>Phone: {phone}</ul>
      <ul>Distance: {distance} meters away from your location</ul>
      <ul>Price: {price}</ul>
      <button className="delete-btn" onClick={handleDeleteClick} >Take Off TGList</button>
    </div>
  )
};

export default List;