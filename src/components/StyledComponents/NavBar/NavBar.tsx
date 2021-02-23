import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { ButtonCards, RowDiv} from '../Styles'
import SVGbackground from '../SVGbackground/SVGbackground'
import ActivitiesIcon from '../SvgIcons/ActivitiesIcon'
import DinnerIcon from '../SvgIcons/DinnerIcon'
import EventsIcon from '../SvgIcons/EventsIcon'
import PlacesIcon from '../SvgIcons/PlacesIcon'
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        
        
        <SVGbackground>
            <SearchBar marginBottom={100} />
            <RowDiv marginBottom={-250}>
            <Link to="/placestoeat" > <ButtonCards><DinnerIcon  /><p>Dinner</p></ButtonCards></Link>
            <Link to="/activities" ><ButtonCards><ActivitiesIcon  /><p>Activities</p></ButtonCards></Link>
        <Link to="/events" ><ButtonCards><EventsIcon  /><p>Events</p></ButtonCards></Link>
        <Link to="/allplaces" ><ButtonCards><PlacesIcon  /><p>Places</p></ButtonCards></Link>
        </RowDiv>
        </SVGbackground>
  
  
            
         
    )
}

export default NavBar
