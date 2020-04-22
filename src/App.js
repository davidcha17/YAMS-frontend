import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Mapbox from ''
import ReactMapGL, {Marker, Popup} from "react-map-gl"

class App extends React.Component{
  
  state = {
    viewport: {
      latitude: 40.7009,
      longitude: -73.9975,
      zoom: 13,
      width:'100vw',
      height: "100vh"
    }
  }
  

  onViewportChange = viewport => {
    // console.log(viewport)
    this.setState({viewport});
    
  };
  
  render() {
    return (
      <div className="App">
      <div style={{position:"fixed", top: "0", left:"0", width:"100%", zIndex:"100", background:"rgba(255, 255, 255, 0.6)"}}>
        {/* <CategorySelector handleRadio={this.handleRadio} filterTerm={this.state.filterTerm}/> */}
      </div>
      <ReactMapGL 
        {...this.state.viewport} 
        mapboxApiAccessToken= "pk.eyJ1IjoiZGF2aWRjaGExNzciLCJhIjoiY2s4b2xoaW5wMWFoMTNncXMzeGp0amExNiJ9.Jqrd_Ga110ET4Dv3aAcKuw"
        mapStyle="mapbox://styles/dwang0816/ck1k0qvij2rrl1cobig03w3rf"
        onViewportChange={this.onViewportChange}
      >
      </ReactMapGL>
      <div style={{position:"fixed", bottom: "0", left:"0", width:"100%", height: "30px", zIndex:"100", background:"rgba(255, 255, 255, 0.6)"}}>
      </div>
    </div>
  );
}
}


export default App;
