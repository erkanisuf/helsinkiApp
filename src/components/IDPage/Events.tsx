import React from 'react'
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
     tags:Tags[];
        }       }
interface Tags{
    id:string;
    name:string;
  }
  
  
const Events:React.FC<Props> = ({data}) => {
    return (
        <div>
            <p>ID: - {data.id}</p> 
           <p>NAME.FI - {data.name.fi}</p> 
           <p>INFO_URL - {data.info_url}</p>
           <p>LOCATION - {data.location.lat},{data.location.lon},{data.location.address.locality},{data.location.address.postal_code},{data.location.address.street_address}</p>
          <p>Event dates {data.event_dates.starting_day}</p>
            {data.tags.map((el,index)=>{return <div key={index}> <p>{el.name}</p></div>})}
        </div>
    )
}

export default Events
