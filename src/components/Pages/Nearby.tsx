import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../../Hook/useFetch";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ItemCard from "../StyledComponents/ItemCard/ItemCard";
import SearchBar from "../StyledComponents/SearchBar/SearchBar";
import {
  Button,
  NextPrevbtn,
  PageContainer,
  SvgContainer,
} from "../StyledComponents/Styles";
import SVGbackground from "../StyledComponents/SVGbackground/SVGbackground";
import SVGPageHeader from "../StyledComponents/SVGbackground/SVGPageHeader";
import LoadingIcon from "../StyledComponents/SvgIcons/LoadingIcon";
import NextIcon from "../StyledComponents/SvgIcons/NextIcon";
import PrevIcon from "../StyledComponents/SvgIcons/PrevIcon";

import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Store } from "../../Context/AppContext";

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
type Param = {
  id: string;
};

const Nearby: React.FC<Props> = () => {
  const { state, dispatch } = useContext(Store);
  const param = useParams<Param>();
  const location = useLocation(); // Router React - using location to refetch in case path changes.

  const [data, setData] = useState<Data[]>([]);
  const [limit, setLimit] = useState<number>(20); // How many items per page
  const [start, setStart] = useState<number>(0); // From where in the Api to start
  const [error, setError] = useState<boolean>(false);

  // THIS: first useEffect fetches by Distance and sets the Data (backend checks what type of elemetn is e.g place,dinner ,event etc. .. and then sends us data.
  //Note: Location is string in the backend ,even tho its as numbers in the frontend.)
  useEffect(() => {
    const abortCont = new AbortController();
    setStart(0); // sets pagination back to 0 in case we change url path
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/Routs/Nearby`, {
      method: "POST",
      body: JSON.stringify({
        latitude: state.location?.latitude.toString(),
        longitude: state.location?.longitude.toString(),
        typeplace: param.id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("err ABORT");
        } else {
          setError(true);
        }
      });
    return () => {
      abortCont.abort();
    };
  }, [location.pathname, state.location]);

  // Pagination Post Request to backend
  const FetchMoreItems = (value: number) => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/Routs/NearbyFetchPagination`,
      {
        method: "POST",
        body: JSON.stringify({
          limit: limit,
          start: value,
          typeplace: param.id,
          latitude: state.location?.latitude.toString(),
          longitude: state.location?.longitude.toString(),
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => setError(true));
  };
  // Pagination
  const NextPage = () => {
    if (start === 0) {
      FetchMoreItems(20);
      setStart(20);
    } else {
      FetchMoreItems(start + 20);
      setStart((prev) => prev + 20);
    }
  };
  const PrevPage = () => {
    if (start > 0) {
      FetchMoreItems(start - 20);
      setStart((prev) => prev - 20);
    }
  };

  if (error) {
    return (
      <SVGPageHeader>
        <h1 style={{ color: "red" }}>
          Something went wrong please refresh.{param.id}
        </h1>
      </SVGPageHeader>
    );
  } else if (!data.length) {
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
        <Link
          to={`/${param.id}`}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          {" "}
          <Button>
            {" "}
            <IoArrowBackCircleSharp style={{ fontSize: "25px" }} />
            Back to /{param.id}
          </Button>
        </Link>
      </div>
      <PageContainer>
        {data
          // .sort((a: Data, b: Data) => {
          //   if (a.description.images == null) return 1; // this function fixes issues if the Api has value null (images)
          //   if (b.description.images == null) return 0;
          //   return b.description.images.length - a.description.images.length; // Sorts Items first by image avaibility
          // }) // NOTE: This is used if needs to Sort Elements with Image (because most of the data has no images)
          .map((el, index) => {
            return <ItemCard key={index} type={param.id} data={el} />;
          })}
      </PageContainer>
      <div
        style={{ display: "flex", width: "80%", justifyContent: "flex-end" }}
      >
        <NextPrevbtn onClick={PrevPage}>
          <SvgContainer width={50} height={50} style={{ margin: "0 auto" }}>
            <PrevIcon />
          </SvgContainer>
        </NextPrevbtn>
        <NextPrevbtn onClick={NextPage}>
          <SvgContainer width={50} height={50} style={{ margin: "0 auto" }}>
            <NextIcon />
          </SvgContainer>
        </NextPrevbtn>
      </div>
    </SVGPageHeader>
  );
};

export default Nearby;
