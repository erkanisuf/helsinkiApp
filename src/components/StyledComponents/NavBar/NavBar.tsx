import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { ButtonCards, RowDiv} from '../Styles'
import SVGbackground from '../SVGbackground/SVGbackground'
import ActivitiesIcon from '../SvgIcons/ActivitiesIcon'
import DinnerIcon from '../SvgIcons/DinnerIcon'
import EventsIcon from '../SvgIcons/EventsIcon'
import PlacesIcon from '../SvgIcons/PlacesIcon'

const NavBar = () => {
    return (
        
        
        <SVGbackground>
            <SearchBar />
            <RowDiv marginBottom={-250}>
        <ButtonCards><DinnerIcon  /><p>Dinner</p></ButtonCards>
        <ButtonCards><ActivitiesIcon  /><p>Activities</p></ButtonCards>
        <ButtonCards><EventsIcon  /><p>Events</p></ButtonCards>
        <ButtonCards><PlacesIcon  /><p>Places</p></ButtonCards>
        </RowDiv>
        </SVGbackground>
  
       
            
         
    )
}

export default NavBar
