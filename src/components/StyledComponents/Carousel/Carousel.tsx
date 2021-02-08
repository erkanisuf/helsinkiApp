import React from 'react'
import Carousel from "react-multi-carousel";
import ItemCard from '../ItemCard/ItemCard';
import "react-multi-carousel/lib/styles.css";
interface Props {
   
    data:Data [];
   type:string;
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
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1400 },
          items: 5
        },
        desktoptw: {
            breakpoint: { max: 1500, min: 1024 },
            items: 3
          },
        
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
const CarouselComp:React.FC<Props> = ({data,type}) => {
    console.log(data,'carous')
    return (
        
          <Carousel responsive={responsive}>
           {data.map((el, index) => {
          return <ItemCard key={index} type={type} data={el} />;
        })}
           </Carousel>
     
       
    )
}

export default CarouselComp
