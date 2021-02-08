
import React from 'react';
import './App.css';
import ItemCard from './components/StyledComponents/ItemCard/ItemCard';
import NavBar from './components/StyledComponents/NavBar/NavBar';
import { useFetch } from './Hook/useFetch';


function App() {
  const res = useFetch("http://open-api.myhelsinki.fi/v1/places/?language_filter=en&limit=5")
  
  const   {data}  = res
  type Person = {
    name: string
  }
  return (
    <div className="App" >
   
  <NavBar />
  <div style={{width:'100%',margin:'250px auto',display:'flex',justifyContent:'flex-start',flexWrap:'wrap'}}>
   
   {data.map((el ,index:number)=>{
     return <ItemCard key={index} type={"places"} data={el} />})};
    
   
    </div>
  
    </div>
  );
}

export default App;
