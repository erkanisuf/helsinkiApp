import React ,{useState,useEffect}from 'react'
import {useLocation} from 'react-router-dom'
import { SvgContainer } from '../StyledComponents/Styles';
import SVGPageHeader from '../StyledComponents/SVGbackground/SVGPageHeader';
import LoadingIcon from '../StyledComponents/SvgIcons/LoadingIcon';
interface LocationState {
      id:string;
      type:string;
  }
  interface IDdata {
    id:string;
    name:{fi:string,en:string};
    info_url:string;
}

const IDPage = () => {
    const params = useLocation<LocationState>();
    const { state} = params;
    const [data,setData] = useState<IDdata>();
    useEffect(() => {
        if (state.type === 'allplaces' ||state.type === 'placetoeat' ){
            FetchById (`${process.env.REACT_APP_SERVER_URL}/api/Routs/PlacebyID/${state.id}`);
        }else if(state.type === 'events'){
            FetchById (`${process.env.REACT_APP_SERVER_URL}/api/Routs/eventID/${state.id}`);
        }else if(state.type === 'activities'){
            FetchById (`${process.env.REACT_APP_SERVER_URL}/api/Routs/activitybyID/${state.id}`);
        }
        return () => {      
        }
    }, [params.pathname])
   
    //Fetchs by ID
    const FetchById = (url:string) =>{
        fetch(url)
        .then(el =>{return el.json()})
        .then(el=>setData(el))
        .catch(err=>console.log(err))}
  
        console.log(data)
    
        if (!data){
            return <SVGPageHeader><SvgContainer  width={120} height={150} style={{margin:'0 auto'}} ><LoadingIcon  /></SvgContainer></SVGPageHeader>
        }
    
    return (
        <SVGPageHeader>
           <p>{data.id}</p> 
           <p>{data.name.fi}</p> 
        </SVGPageHeader>
    )
}

export default IDPage
