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
    
     where_when_duration:{
        duration?:string;
        where_and_when?:string;
                 }
     tags:Tags[];
        }       }
interface Tags{
    id:string;
    name:string;
  }
  
  
const Activities:React.FC<Props>  = ({data}) => {
    return (
        <div>
        <p>ID: - {data.id}</p> 
       <p>NAME.FI - {data.name.fi}</p> 
       <p>INFO_URL - {data.info_url}</p>
       <p>LOCATION - {data.location.lat},{data.location.lon},{data.location.address.locality},{data.location.address.postal_code},{data.location.address.street_address}</p>
      <p>where and when {data.where_when_duration.duration},{data.where_when_duration.where_and_when}</p>
        {data.tags.map((el,index)=>{return <div key={index}> <p>{el.name}</p></div>})}
    </div>
    )
}

export default Activities
