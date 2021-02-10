
import React from 'react';
import './App.css';
import CarouselComp from './components/StyledComponents/Carousel/Carousel';

import NavBar from './components/StyledComponents/NavBar/NavBar';
import { CarouselContainer, SvgContainer } from './components/StyledComponents/Styles';
import ActivitiesIcon from './components/StyledComponents/SvgIcons/ActivitiesIcon';
import EventsIcon from './components/StyledComponents/SvgIcons/EventsIcon';
import PlacesIcon from './components/StyledComponents/SvgIcons/PlacesIcon';
import { useFetch } from './Hook/useFetch';


function App() {
  // const res = useFetch("http://open-api.myhelsinki.fi/v1/places/?language_filter=en&limit=10")
  const places = useFetch(`${process.env.REACT_APP_SERVER_URL}/api/Routs/front10`) //Places
  const events = useFetch(`${process.env.REACT_APP_SERVER_URL}/api/Routs/front10Events`)
  const activities = useFetch(`${process.env.REACT_APP_SERVER_URL}/api/Routs/front10Activities`)
  const   {data}  = places//Places
 
  
 
  return (
    <div className="App" >
   
  <NavBar />
 
   < CarouselContainer >
   <SvgContainer  width={150} height={150}  ><PlacesIcon  /> <h1> Places</h1></SvgContainer>
  
   <CarouselComp type={"places"} data={data}/>
   </ CarouselContainer >
   < CarouselContainer >
   <SvgContainer  width={200} height={150}  ><ActivitiesIcon  /> <h1> Activities</h1></SvgContainer>
   <CarouselComp type={"events"} data={activities.data}/>
   </ CarouselContainer >
   < CarouselContainer >
   <SvgContainer  width={150} height={150}  ><EventsIcon  /> <h1> Events</h1></SvgContainer>
   <CarouselComp type={"events"} data={events.data}/>
   </ CarouselContainer >
  
    
  
    </div>
  );
}

export default App;
