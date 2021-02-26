
import React from 'react';
import { Route,  Switch } from 'react-router';
import './App.css';
import IDPage from './components/IDPage/IDPage';
import Page from './components/Pages/Page';


import NavBar from './components/StyledComponents/NavBar/NavBar';
import FrontPage from './FrontPage';



function App() {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position)
  });
  
  function geoloc () {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position)
    });
  }
  
 
  return (
    <div className="App" >
   
{/* <button onClick={geoloc}>Location</button> */}
  
  <Switch>
          <Route path="/events">
          <Page link={`${process.env.REACT_APP_SERVER_URL}/api/Routs/allEvents`} type={"events"}/> 
          </Route>
          <Route path="/placestoeat">
            <Page link={`${process.env.REACT_APP_SERVER_URL}/api/Routs/allPlacesToEat`} type={"placetoeat"}/> 
          </Route>
          <Route path="/activities">
            <Page link={`${process.env.REACT_APP_SERVER_URL}/api/Routs/allActivities`} type={"activities"}/> 
          </Route>
          <Route path="/allplaces">
            <Page link={`${process.env.REACT_APP_SERVER_URL}/api/Routs/allPlaces`} type={"allplaces"}/> 
          </Route>
          <Route path="/allbyid/:id">
           
            <IDPage />
          </Route>

          <Route path="/">
          <NavBar />
          <FrontPage /> 

           
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"> 
          <linearGradient id="gradient">
                          <stop offset="10%" stopColor="#70c0ce" />
                    <stop offset="90%" stopColor="#0093E9" />
                  
                    
                        </linearGradient>
                  <path fill="url(#gradient)" fillOpacity="1" d="M0,192L120,208C240,224,480,256,720,229.3C960,203,1200,117,1320,74.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
                </svg>
          </Route>

        </Switch>
        


    </div>
  );
}

export default App;
