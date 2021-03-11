import React from "react";

export const useFetch = (url: string, props?: any) => {
  const [response, setResponse] = React.useState([]);
  const [error, setError] = React.useState<any>(null);
  React.useEffect(() => {
    const abortCont = new AbortController();
    const fetchData = async () => {
      try {
        // const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`,{
        const res = await fetch(`${url}`, {
          method: "GET",
          signal: abortCont.signal,
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();

        if (json.status === 404) {
          setError(true);
        } else {
          setResponse(json.data);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("err ABORT");
        } else {
          setError(error);
        }
      }
    };
    fetchData();
    return () => abortCont.abort();
  }, [props]);
  return { data: response, error };
};
