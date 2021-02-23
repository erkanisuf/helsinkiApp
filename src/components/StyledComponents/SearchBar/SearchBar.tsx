import React from 'react'
import {  RowDiv, SearchBarStyle, SearchButton, SelectStyle } from '../Styles'
import SearchIcon from '../SvgIcons/SearchIcon'

interface Props {
    marginBottom:number;
}
const SearchBar:React.FC<Props> = ({marginBottom}) => {
    return (
        <RowDiv marginBottom={marginBottom}>
            
            <SearchButton> <SearchIcon /></SearchButton>< SearchBarStyle placeholder="Search keyword..."/>
           
           <SelectStyle >
               <option>Dinner</option>
               <option>Events</option>
               <option>Activities</option>
               
               </SelectStyle>
        </RowDiv>
    )
}

export default SearchBar
