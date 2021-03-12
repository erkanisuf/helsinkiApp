import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ItemCard from "../StyledComponents/ItemCard/ItemCard";
import { PageContainer, SvgContainer } from "../StyledComponents/Styles";
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
  console.log("s", location.state);
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
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
          console.log(res);
          setData(res.data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("err ABORT");
          } else {
            setError(true);
          }
        });
    }
    return () => {
      abortCont.abort();
    };
  }, [location]);
  if (error) {
    return (
      <SVGPageHeader>
        <h1 style={{ color: "red" }}>Something went wrong please refresh.</h1>
      </SVGPageHeader>
    );
  } else if (!data.length || location.state.type === undefined) {
    return (
      <SVGPageHeader>
        <SvgContainer width={120} height={150} style={{ margin: "0 auto" }}>
          <LoadingIcon />
        </SvgContainer>
      </SVGPageHeader>
    );
  }
  return (
    <SVGPageHeader>
      <div>
        You Searched for:{" "}
        {location.state.input.map((el, index) => {
          return <span>{el.name},</span>;
        })}
      </div>
      <PageContainer>
        {data
          .sort((a: Data, b: Data) => {
            if (a.description.images == null) return 1; // this function fixes issues if the Api has value null (images)
            if (b.description.images == null) return 0;
            return b.description.images.length - a.description.images.length; // Sorts Items first by image avaibility
          })
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
