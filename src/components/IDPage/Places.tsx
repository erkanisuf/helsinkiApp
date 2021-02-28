import React from 'react'
import { DaysContainer, GridImageDiv, GridPage, Tags } from '../StyledComponents/Styles'

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
      tags:Tagz[];
    description:{body:string;
                intro?:string;
                images?:Images[] ; }
    

    }

}
interface Hoursarr{
  weekday_id:number;
  opens?:string;
  closes?:string;
  open24h?:boolean;

}
interface Tagz{
  id:string;
  name:string;

}

interface Images{
    copyright_holder:string;
    license_type:{id:number;
                  name:string;  }
    url:string;
  }
  //
const Places:React.FC<Props> = ({data}) => {

    const WeekDayToName = (param:number) =>{
       
        switch(param) {
            case 1:
              return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Werdnesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 7:
                return "Sunday";
            default:
                return ""
          }

          
    }
    
    return (
        <GridPage>
            {/* <div>ID: - {data.id}</div>  */}
             {/* Name and Link URL */}
           <div><h1>{data.name.fi} </h1><div><a href={data.info_url} > Website </a></div>
           </div> 
            {/* Location */}
           <div>LOCATION - {data.location.lat},{data.location.lon},{data.location.address.locality},{data.location.address.postal_code},{data.location.address.street_address}</div>
            {/* Opening Hours*/}
           <div>
              
               <div>{data.opening_hours.hours.map((el,index)=>
           { return <DaysContainer key={index}>
            <div><p>{WeekDayToName(el.weekday_id)}</p></div>
           <div><span>{el.opens ? el.opens.substring(0, el.opens.length - 3) : 'Closed'}</span> - <span>{el.closes ? el.closes.substring(0, el.closes.length - 3)  : ''}</span></div>
           {el.open24h && <div>24/7</div>}
           </DaysContainer>})}
                </div>
                { data.opening_hours.openinghours_exception && <div style={{fontStyle:'italic',color:'red',margin:'10px auto'}}>Note: " { data.opening_hours.openinghours_exception } "</div> }
           </div>
           {/* Tags */}
           <div>{data.tags.map((el,index)=>{return <Tags key={index}># {el.name}</Tags>})} </div>
            {/* Description Body text */}
           <div> <h1>Description</h1>
            <p>{data.description.body}</p></div>
            {/* Images */}
            <GridImageDiv>
        
                {data.description.images?.map((el,index)=>{return <div key={index}><img src={el.url} alt={el.license_type.name} /><p>{el.copyright_holder}</p> </div> })} 
            </GridImageDiv>
        </GridPage>
    )
}

export default Places
