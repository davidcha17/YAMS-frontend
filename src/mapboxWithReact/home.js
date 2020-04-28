import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, {Marker, Popup} from "react-map-gl"

console.log(process.env.REACT_APP_API_KEY)

class Home extends React.Component{

    onViewportChange = (viewport) => {
        console.log(viewport)
        this.props.onViewportChanged(viewport)
    }

    render(){
        return(
            <div>
                <div style={{position:"fixed", top: "0", left:"0", width:"100%", zIndex:"100", background:"rgba(255, 255, 255, 0.6)"}}>
                    {/* <CategorySelector handleRadio={this.handleRadio} filterTerm={this.state.filterTerm}/> */}
                </div>
                <ReactMapGL 
                {...this.props.viewport} 
                mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
                mapStyle="mapbox://styles/dwang0816/ck1k0qvij2rrl1cobig03w3rf"
                onViewportChange={this.onViewportChange}
                >

                </ReactMapGL>
                <div style={{position:"fixed", bottom: "0", left:"0", width:"100%", height: "30px", zIndex:"100", background:"rgba(255, 255, 255, 0.6)"}}>
                </div>
            </div>
        )
    }
}

export default Home 