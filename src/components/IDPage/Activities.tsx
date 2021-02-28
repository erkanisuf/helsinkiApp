import React from 'react'
import { EventsGrid, Tags } from '../StyledComponents/Styles'

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
    
     where_when_duration:{
        duration?:string;
        where_and_when?:string;
                 }
     tags:Tagz[];
     description:{body:string;
        intro?:string;
        images?:Images[] ; };
        }       }
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
  
  
const Activities:React.FC<Props>  = ({data}) => {
    return (
        <EventsGrid>
       
         {/* Name and Link URL */}
       <div > <h1>{data.name.fi} </h1>
      
       <div >
       <div style={{fontWeight:700,color:'#969494'}}>{data.where_when_duration.duration && <span>Duration: {data.where_when_duration.duration }</span> }</div>
       <div style={{fontWeight:700,color:'#969494'}}>{data.where_when_duration.where_and_when && <span>Place and When: {data.where_when_duration.where_and_when }</span> }</div>
           <button  onClick={()=> window.open(data.info_url, "_blank")}>Info </button>
       </div> </div>
        {/* Image */}
       <div>
           <div><div><img  src={data.description.images ? data.description.images[0].url :''} alt={data.description.images ? data.description.images[0].url :''} /></div></div>
        </div>
     
        {/* Location */}
       <div>LOCATION - {data.location.lat},{data.location.lon},{data.location.address.locality},{data.location.address.postal_code},{data.location.address.street_address}</div>
        {/* Opening Hours*/}
     <div></div>
       {/* Tags */}
       
       <div>{data.tags.map((el,index)=>{return <Tags key={index}># {el.name}</Tags>})} </div>
        {/* Description Body text */}
       <div style={{marginTop:'55px'}}> <h1>Description</h1>
       
        <div dangerouslySetInnerHTML={{__html:data.description.body}} />
         {/* Event Dates */}
        
        </div>
        <div style={{width:300}}>
            {data.description.images?.map((el,index)=>{return <div key={index} ><img src={el.url} alt={el.license_type.name} /><p>{el.copyright_holder}</p> </div> })}
        </div>
        
           
       
    
            
    </EventsGrid>
    )
}

export default Activities
