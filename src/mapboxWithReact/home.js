import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, {Marker, Popup} from "react-map-gl"


class Home extends React.Component{

    onViewportChange = (viewport) => {
        // console.log(viewport)
        this.props.onViewportChanged(viewport)
    }

    handleOpenClick = (restaurant) => {
        // console.log("click on the handler")
        // e.preventDefault()
        this.props.setSelectedRestaurant(restaurant)
        // console.log(this.props.selectedRestaurant)
    }

    handleCloseClick = (restaurant) => {
        this.props.deselectRestaurant(restaurant)
    }

    renderRestaurantMarkers = (restaurants) => {
        return this.props.arrayOfRestaurants.map( restaurant => {
            return <Marker key={restaurant.id} longitude={restaurant.long} latitude={restaurant.lat} >
                    <button className="marker-btn" onClick={ () => {this.handleOpenClick(restaurant)} } 
                    onClose={ () => {this.handleCloseClick(restaurant)} } 
                    >
                        <img src="https://cdn4.iconfinder.com/data/icons/pokemon-go/512/Pokemon_Go-17-512.png" alt="icon" />
                    </button>  
                   </Marker> 
        })
    } 

    addOneToList = (e) => {
        console.log(this.props.selectedRestaurant)
        console.log("adding...")

        fetch(`http://localhost:4000/lists`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(this.props.selectedRestaurant)
        })
        .then( res => res.json())
        .then((restObj) => {
            this.props.addOneRestaurantToList(restObj, this.props.selectedRestaurant)
        })
    }
    

    render(){
    
        // let { name, image_url, url, phone, address, price, kind_of_food, transactions, distance } = this.props.setSelectedRestaurant
        // attributes :id, :name, :image_url, :url, :phone, :lat, :long, :address, :price, :kind_of_food, :distance, :transactions

        return(
            <div>
                <title>
                Welcome to YAMS
                </title>
                <ReactMapGL 
                {...this.props.viewport} 
                mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
                mapStyle='mapbox://styles/davidcha177/ck9sxqarx0ai11ipkxl351lis'
                onViewportChange={this.onViewportChange}
                >
                    {this.renderRestaurantMarkers()}

                    {this.props.selectedRestaurant && (
                        <Popup className="popup"
                        latitude={this.props.selectedRestaurant.lat} 
                        longitude={this.props.selectedRestaurant.long} 
                        onClose={ () => {this.handleCloseClick(this.props.selectedRestaurant)} }
                        >
                            <h3>{this.props.selectedRestaurant.name}</h3><br/>
                            <img src={this.props.selectedRestaurant.image_url} alt={this.props.selectedRestaurant.name} /><br/>
                            {/* Url: {this.props.selectedRestaurant.url} */}
                            Address: {this.props.selectedRestaurant.address}<br />
                            Transaction(s): {this.props.selectedRestaurant.transactions}<br />
                            Price: {this.props.selectedRestaurant.price}<br />
                            Phone: {this.props.selectedRestaurant.phone}<br/>
                            {/* Distance: {this.props.selectedRestaurant.distance}<br/> */}
                            Type_of_food: {this.props.selectedRestaurant.kind_of_food}<br />
                            <button onClick={() => {this.addOneToList(this.props.selectedRestaurant)} } >add TGList</button>
                        </Popup>
                    )}
                </ReactMapGL>
            </div>
        )
    }
}

export default Home 