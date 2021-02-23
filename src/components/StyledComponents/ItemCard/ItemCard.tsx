import React from 'react'
import { ItemsCard } from '../Styles'
import noImage from "../../../staticimages/No_Image_Available.jpg"
import { getDistance } from "geolib"; // For Distance LIbary
interface Props {
type:string;
data:{
  name:  Language;
    id:string;
    description:Images;
    location:{lat:number,lon:number}
};

}

type Language = {
    en: string;
    fi:string;
};
interface Imageobj {
   url:string;
}
type Images= {
   images:Imageobj [];
    
};
 

const ItemCard:React.FC<Props> = ({type,data}) => {
  const myDistance = getDistance(
    { latitude: 60.17626, longitude: 24.938082 }, // my position this is just dummy data
    { latitude: data.location.lat, longitude: data.location.lon } // restourant position
  );
// console.log(data)
// console.log(data.description)
    if(!data ){return <div><h1>Loading..</h1></div>}
    else if(data.description.images === null){
      return <div></div>
    }
    else if (type === "events"){
        return   <ItemsCard>
            <div className="card-img" style={{backgroundImage:`url("${data.description.images.length  ? data.description.images[0].url : noImage}")`}}></div>
          <p>{data.name.en ? data.name.en :data.name.fi }</p>
          <div> {(myDistance / 1000).toFixed(1)}km</div>
        </ItemsCard>
    
      
    }
    else
    return (
        <ItemsCard>
         
           <div className="card-img" style={{backgroundImage:`url("${data.description.images.length   ? data.description.images[0].url : noImage}")`}}></div> 
            <p>{data.name.en}</p>
         
            <div> {(myDistance / 1000).toFixed(1)}km</div>
        </ItemsCard>
    
      
    )
}

export default ItemCard
