import React, { useState,useEffect}  from 'react'
import { useFetch } from '../../Hook/useFetch';

import {useLocation} from 'react-router-dom'
import ItemCard from '../StyledComponents/ItemCard/ItemCard';
import SearchBar from '../StyledComponents/SearchBar/SearchBar';
import { NextPrevbtn, PageContainer, SvgContainer } from '../StyledComponents/Styles';
import SVGbackground from '../StyledComponents/SVGbackground/SVGbackground';
import SVGPageHeader from '../StyledComponents/SVGbackground/SVGPageHeader';
import LoadingIcon from '../StyledComponents/SvgIcons/LoadingIcon';
import NextIcon from '../StyledComponents/SvgIcons/NextIcon';
import PrevIcon from '../StyledComponents/SvgIcons/PrevIcon';



interface Props {
    link:string;
    type:string;
    

}

type Language = {
    en: string;
    fi:string;
};

type Data = {
    name:  Language;
      id:string;
      description:Images;
      length:number;
      location:{lat:number,lon:number}
}
interface Imageobj {
   url:string;
}
type Images= {
   images:Imageobj [];
    
};


const Page:React.FC<Props>= ({link,type}) => {
  const location = useLocation(); // Router React - using location to refetch in case path changes.
    const allItems = useFetch(link, location.pathname);
 
    const [data,setData] = useState<Data[]>(allItems.data);
    const [limit,setLimit] = useState<number>(20); // How many items per page
    const [start,setStart] = useState<number>(0); // From where in the Api to start
   
    useEffect(() => {
      setStart(0); // sets pagination back to 0 in case we change url path
      setData(allItems.data);
    }, [location.pathname,allItems.data])

    
  // Pagination Post Request to backend
   const FetchMoreItems = (value:number) =>{
   
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/Routs/pagingFetch`, {
      method: 'POST',
      body:  JSON.stringify({
        limit:limit,
        start:value,
        typeplace:type
      }),
      headers: {'Content-Type':'application/json',},
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result,'kk')
        setData(result.data)
      })
      .catch((err) => console.log(err))
   }
   // Pagination
   const NextPage = () =>{
     console.log(type)
     
    if (start === 0){
      
      FetchMoreItems(20);
      setStart(20);
     }else{
      FetchMoreItems(start+20);
      setStart(prev=>prev+20);
     }
    
   }
   const PrevPage = () =>{
     if (start >0){
      
      FetchMoreItems(start-20);
      setStart(prev=>prev-20);
     }
   
    
   }
   console.log(start)
   if(!data.length){
      return <SVGPageHeader><SvgContainer  width={120} height={150} style={{margin:'0 auto'}} ><LoadingIcon  /></SvgContainer></SVGPageHeader>
   }
    return (
        
             <SVGPageHeader>
           
            
            <PageContainer>
          {data.sort((a:Data,b:Data)=> {
      if (a.description.images==null) return 1 // this function fixes issues if the Api has value null (images)
      if (b.description.images==null) return 0 
     return b.description.images.length - a.description.images.length // Sorts Items first by image avaibility
 }).map((el,index)=>{
            return <ItemCard key={index} type={type} data={el} />

          })}
              
            </PageContainer>
            <div style={{display:'flex',width:'80%',justifyContent:'flex-end'}}>
            <NextPrevbtn onClick={PrevPage}><SvgContainer  width={50} height={50} style={{margin:'0 auto'}} ><PrevIcon  /></SvgContainer></NextPrevbtn>
            <NextPrevbtn  onClick={NextPage}><SvgContainer  width={50} height={50} style={{margin:'0 auto'}} ><NextIcon  /></SvgContainer></NextPrevbtn>
            
            </div>
            
            </SVGPageHeader>
        
         
    )
}

export default Page;
