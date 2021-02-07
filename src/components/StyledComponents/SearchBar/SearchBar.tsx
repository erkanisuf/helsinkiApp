import React from 'react'
import {  RowDiv, SearchBarStyle, SearchButton, SelectStyle } from '../Styles'
import SearchIcon from '../SvgIcons/SearchIcon'

const SearchBar = () => {
    return (
        <RowDiv marginBottom={100}>
            
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
