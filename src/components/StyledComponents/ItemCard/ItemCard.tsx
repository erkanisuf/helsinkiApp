import React from 'react'
import { ItemsCard } from '../Styles'
interface Props {
type:string;
data:Data;

}

type Language = {
    en: string;
    fi:string;
};
  type Data = {
    name:  Record<string, Language>;
    id:string;
};

const ItemCard:React.FC<Props> = ({type,data}) => {
console.log(data)
    if(!data ){return <div>Loading..</div>}
    else if (type === "events"){
        return   <ItemsCard>
            <div className="card-img" style={{backgroundImage:"url('https://img.yle.fi/uutiset/uutisen-ims-kuvat/article11604636.ece/ALTERNATES/w960/39-7322545f8eeda7822ce')"}}></div>
          <p>{data.name.en}</p>
          <p>{data.name.fi}</p>
        </ItemsCard>
    
      
    }else
    return (
        <ItemsCard>
           
            <div className="card-img" style={{backgroundImage:"url('https://img.yle.fi/uutiset/uutisen-ims-kuvat/article11604636.ece/ALTERNATES/w960/39-7322545f8eeda7822ce')"}}></div>
            <p>{data.name.en}</p>
          <p>{data.name.fi}</p>
          <p>{data.id}</p>
        </ItemsCard>
    
      
    )
}

export default ItemCard
