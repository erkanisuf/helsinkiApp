import React from "react";



export const useFetch = (url:string) => {
    const [response, setResponse] = React.useState([]);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
      const fetchData = async () => {
       
        try { 
          const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`,{
            method: 'GET',
           
            headers: {'Content-Type':'application/json'},
          });
          const json = await res.json();
          
          setResponse(json.data);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { data:response, error };
  };