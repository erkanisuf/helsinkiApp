import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, ButtonCards} from './components/StyledComponents/Styles'
import DinnerIcon from './components/StyledComponents/SvgIcons/DinnerIcon'
import ActivitiesIcon from './components/StyledComponents/SvgIcons/ActivitiesIcon';
import EventsIcon from './components/StyledComponents/SvgIcons/EventsIcon';
import PlacesIcon from './components/StyledComponents/SvgIcons/PlacesIcon';

function App() {
  let erkan:string = "gg";
  
  return (
    <div className="App" >
    <h1> APp hs</h1>
    <div style={{backgroundColor:'darkgrey',display:'flex',justifyContent:'center'}}>
  
    <ButtonCards><DinnerIcon  /><p>Dinner</p></ButtonCards>
    <ButtonCards><ActivitiesIcon  /><p>Activities</p></ButtonCards>
    <ButtonCards><EventsIcon  /><p>Events</p></ButtonCards>
    <ButtonCards><PlacesIcon  /><p>Places</p></ButtonCards>
    
    </div>
    </div>
  );
}

export default App;
