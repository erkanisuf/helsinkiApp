import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MdGpsFixed } from "react-icons/md";
import { useLocation } from "react-router";
import { Store } from "../../Context/AppContext";
import ItemCard from "../StyledComponents/ItemCard/ItemCard";
import {
  Button,
  PageContainer,
  SvgContainer,
  Tags,
} from "../StyledComponents/Styles";
import SVGPageHeader from "../StyledComponents/SVGbackground/SVGPageHeader";
import LoadingIcon from "../StyledComponents/SvgIcons/LoadingIcon";

interface Props {}

type Language = {
  en: string;
  fi: string;
};

type Data = {
  name: Language;
  id: string;
  description: Images;
  length: number;
  location: { lat: number; lon: number };
  event_dates: { starting_day: string };
};
interface Imageobj {
  url: string;
}
type Images = {
  images: Imageobj[];
};
type Location = {
  tags: string;
  type: string;
  input: searchedTags[];
};

type searchedTags = {
  name: string;
  id: string;
};
const Search = () => {
  const location = useLocation<Location>();
  const { state, dispatch } = useContext(Store);
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [searchresult, setSearchresult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    setError(false);
    const abortCont = new AbortController();
    //`${process.env.REACT_APP_SERVER_URL}/api/Routs/searchByTag/${tagstoAPI[0].id},${tagstoAPI[1].id}`
    // NOTE!: EncodeUrlComponent transforms the string to valid url for the API "it changes the :,comma etc. to special symbols %!@#! etc."
    if (location.state && location.state.type !== undefined) {
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/Routs/searchTags${
          location.state.type
        }/${encodeURIComponent(location.state.tags)}`,
        {
          method: "GET",
          signal: abortCont.signal,
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (!res.data.length) {
            setSearchresult("No items were found with these tags:");
            setLoading(false);
            setError(false);
          } else {
            setData(res.data);
            setLoading(false);
            setError(false);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("err ABORT");
          } else {
            setError(true);
            setLoading(false);
          }
        });
    }

    return () => {
      abortCont.abort();
    };
  }, [location]);
  // End UseEffect Fetc

  //Sort Results of Front end by Distance
  const sortbyDistance = () => {
    setLoading(true);
    setError(false);
    //`${process.env.REACT_APP_SERVER_URL}/api/Routs/searchByTag/${tagstoAPI[0].id},${tagstoAPI[1].id}`
    // NOTE!: EncodeUrlComponent transforms the string to valid url for the API "it changes the :,comma etc. to special symbols %!@#! etc."
    if (location.state && location.state.type !== undefined) {
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/Routs/searchTags${
          location.state.type
        }Distance/${encodeURIComponent(location.state.tags)}`,
        {
          method: "POST",

          body: JSON.stringify({
            latitude: state.location?.latitude.toString(),
            longitude: state.location?.longitude.toString(),
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res, "WTF");
          if (!res.data.length) {
            setSearchresult("No items were found with these tags:");
            setLoading(false);
            setError(false);
          } else {
            setData(res.data);
            setLoading(false);
            setError(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setLoading(false);
        });
    }
  };

  if (error) {
    return (
      <SVGPageHeader>
        <h1 style={{ color: "red" }}>Something went wrong please refresh.</h1>
      </SVGPageHeader>
    );
  } else if (!data.length || location.state.type === undefined) {
    return (
      <SVGPageHeader>
        <div>
          <h4>{searchresult ? searchresult : "Results with tags:"}</h4>
          <div
            style={{
              display: "flex",
              margin: "15px auto",
              justifyContent: "center",
            }}
          >
            {location.state.input.map((el, index) => {
              return <Tags key={index}># {el.name}</Tags>;
            })}
          </div>
        </div>
        {loading && (
          <SvgContainer width={120} height={150} style={{ margin: "0 auto" }}>
            <LoadingIcon />
          </SvgContainer>
        )}
      </SVGPageHeader>
    );
  }
  return (
    <SVGPageHeader>
      <div>
        <h4>{searchresult ? searchresult : "Results with tags:"}</h4>
        <div
          style={{
            display: "flex",
            margin: "15px auto",
            justifyContent: "center",
          }}
        >
          {location.state.input.map((el, index) => {
            return <Tags key={index}># {el.name}</Tags>;
          })}
        </div>
        <div
          style={{
            width: "70%",
            margin: "0 auto",
            borderBottom: "1px solid #ccc",
            padding: "10px",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Button
            onClick={sortbyDistance}
            disabled={!state.location?.latitude ? true : false}
          >
            {" "}
            <MdGpsFixed style={{ fontSize: "25px" }} />
            {!state.location?.latitude ? "Location Turned off" : "Closes to me"}
          </Button>
        </div>
      </div>
      <PageContainer>
        {data
          // .sort((a: Data, b: Data) => {
          //   if (a.description.images == null) return 1; // this function fixes issues if the Api has value null (images)
          //   if (b.description.images == null) return 0;
          //   return b.description.images.length - a.description.images.length; // Sorts Items first by image avaibility
          // }) NOTE: Use Only if you want to show the ones with images first (Most of the Data has no Images !)
          .map((el, index) => {
            return (
              <ItemCard key={index} type={location.state.type} data={el} />
            );
          })}
      </PageContainer>
    </SVGPageHeader>
  );
};

export default Search;
