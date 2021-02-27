import React ,{useState,useEffect}from 'react'
import {useLocation} from 'react-router-dom'
import { SvgContainer } from '../StyledComponents/Styles';
import SVGPageHeader from '../StyledComponents/SVGbackground/SVGPageHeader';
import LoadingIcon from '../StyledComponents/SvgIcons/LoadingIcon';
import Activities from './Activities';
import Events from './Events';
import Places from './Places';
interface LocationState {
      id:string;
      type:string;
  }
  interface IDdata {
    id:string;
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
        tags:Tags[];
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

const IDPage = () => {
    const params = useLocation<LocationState>();
    const { state} = params;
    const [data,setData] = useState<IDdata | any>();
    const [error,setError] = useState<boolean>(false);
    
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
        .then(el=>{
            
            if(el.status === 500 ){
                setError(true)
                
            }else{
                setData(el)
                    
            }
            
        })
           
        .catch(err=>{
            console.log(err)
            setError(true)
        })}
  
        console.log(data)
        const PageByType = () =>{
                //Checks the Type of Object and then renders component for it
            switch(state.type) {
                case 'allplaces':
                  return <Places data={data} />
                case 'placetoeat':
                    return <Places data={data} />
                case 'events':
                    return <Events data={data}/>
                case 'activities':
                    return <Activities data={data} />
                default:
                    return <SVGPageHeader><h1 style={{color:'red'}}>Something went wrong please refresh.</h1></SVGPageHeader>
              }
        }

        if(error){
            return <SVGPageHeader><h1 style={{color:'red'}}>Something went wrong please refresh.</h1></SVGPageHeader>
        }
        else if (!data){
            return <SVGPageHeader><SvgContainer  width={120} height={150} style={{margin:'0 auto'}} ><LoadingIcon  /></SvgContainer></SVGPageHeader>
        }else
    
    return (
        <SVGPageHeader>
            {PageByType()}
        </SVGPageHeader>
    )
}

export default IDPage
