import React from 'react'
import { ItemsCard } from '../Styles'
import noImage from "../../../staticimages/No_Image_Available.jpg"
interface Props {
type:string;
data:Data;

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
  type Data = {
    name:  Record<string, Language>;
    id:string;
    description:Images;
};

const ItemCard:React.FC<Props> = ({type,data}) => {
// console.log(data)
// console.log(data.description)
    if(!data ){return <div><h1>Loading..</h1></div>}
    else if (type === "events"){
        return   <ItemsCard>
            <div className="card-img" style={{backgroundImage:`url("${data.description.images.length  ? data.description.images[0].url : noImage}")`}}></div>
          <p>{data.name.en ? data.name.en :data.name.fi }</p>
        
        </ItemsCard>
    
      
    }else
    return (
        <ItemsCard>
         
           <div className="card-img" style={{backgroundImage:`url("${data.description.images.length   ? data.description.images[0].url : noImage}")`}}></div> 
            <p>{data.name.en}</p>
         
          <p>{data.id}</p>
        </ItemsCard>
    
      
    )
}

export default ItemCard
