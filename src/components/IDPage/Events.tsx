import React from 'react'
import {  EventsGrid, Tags } from '../StyledComponents/Styles'
import moment from 'moment'
interface Props {
    data:{ id:string;
     name:{fi:string,en:string};
     info_url:string;

     location:{lat:number;
         lon:number;
         address:{street_address:string;
         postal_code:string;
         locality:string;}
              }
    
     event_dates:{
        additional_description?:string;
        ending_day?:string;
        starting_day?:string;
                 }
     tags:Tagz[];
     description:{body:string;
        intro?:string;
        images?:Images[] ; };
        
        }
        }       
interface Tagz{
    id:string;
    name:string;
  }
  interface Images{
    copyright_holder:string;
    license_type:{id:number;
                  name:string;  }
    url:string;
  }
  
  
const Events:React.FC<Props> = ({data}) => {
    return (
        <EventsGrid>
       
         {/* Name and Link URL */}
       <div><h1>{data.name.fi} </h1>
       <div style={{fontWeight:800}}>Starting Day: {moment(data.event_dates.starting_day).format('MMMM Do YYYY, h:mm:ss a')}</div>
       <div><button onClick={()=> window.open(data.info_url, "_blank")}>Tickets </button></div>
       </div> 
        {/* Image */}
       <div><div>{data.description.images?.map((el,index)=>{return <div key={index} ><img src={el.url} alt={el.license_type.name} /><p>{el.copyright_holder}</p> </div> })} </div>
        </div>
        {/* Location */}
       <div>LOCATION - {data.location.lat},{data.location.lon},{data.location.address.locality},{data.location.address.postal_code},{data.location.address.street_address}</div>
        {/* Opening Hours*/}
     <div></div>
       {/* Tags */}
       
       <div>{data.tags.map((el,index)=>{return <Tags key={index}># {el.name}</Tags>})} </div>
        {/* Description Body text */}
       <div> <h1>Description</h1>
       
        <div dangerouslySetInnerHTML={{__html:data.description.body}} />
         {/* Event Dates */}
        
        </div>
        
       
    
            
    </EventsGrid>
    )
}

export default Events
