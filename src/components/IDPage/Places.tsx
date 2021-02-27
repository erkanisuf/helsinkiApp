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
  opening_hours:{hours:Hoursarr[];
      openinghours_exception?:string;}
      tags:Tags[];}
}
interface Hoursarr{
  weekday_id:number;
  opens?:string;
  closes?:string;
  open24h?:boolean;

}
interface Tags{
  id:string;
  name:string;

}
const Places:React.FC<Props> = ({data}) => {
    
    return (
        <div>
            <p>ID: - {data.id}</p> 
           <p>NAME.FI - {data.name.fi}</p> 
           <p>INFO_URL - {data.info_url}</p>
           <p>LOCATION - {data.location.lat},{data.location.lon},{data.location.address.locality},{data.location.address.postal_code},{data.location.address.street_address}</p>
           { data.opening_hours.openinghours_exception}
           {data.opening_hours.hours.map((el,index)=>{ return <div key={index}><p>{el.opens},weekday{el.weekday_id},closes:{el.closes},open24h{el.open24h ?"yes":'no'}</p></div>})}
            {data.tags.map((el,index)=>{return <div key={index}> <p>{el.name}</p></div>})}
        </div>
    )
}

export default Places
