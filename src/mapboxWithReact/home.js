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

    render(){
        // console.log(this.props.restaurantCollections)
        // let { selectedRestaurant, array } = this.props.restaurantCollections

        return(
            <div>
                <div>
                This will be the popup section for showing one clicked restaurant
                </div>
                <ReactMapGL 
                {...this.props.viewport} 
                mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
                mapStyle='mapbox://styles/davidcha177/ck9sxqarx0ai11ipkxl351lis'
                onViewportChange={this.onViewportChange}
                >
                    {this.renderRestaurantMarkers()}

                    {this.props.selectedRestaurant && (
                        <Popup latitude={this.props.selectedRestaurant.lat} longitude={this.props.selectedRestaurant.long} 
                        onClose={ () => {this.handleCloseClick(this.props.selectedRestaurant)} }
                        >
                            {this.props.selectedRestaurant.name}
                        </Popup>
                    )}
                </ReactMapGL>
            </div>
        )
    }
}

export default Home 