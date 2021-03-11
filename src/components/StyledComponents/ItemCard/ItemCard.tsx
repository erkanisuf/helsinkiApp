import React, { useContext, useEffect, useState } from "react";
import { ItemsCard } from "../Styles";
import noImage from "../../../staticimages/No_Image_Available.jpg";
import { getDistance } from "geolib"; // For Distance LIbary
import { Link } from "react-router-dom";
import { FaGrinStars } from "react-icons/fa";
import { MdGpsOff } from "react-icons/md";
import { Store } from "../../../Context/AppContext";
import moment from "moment";

interface Props {
  type: string;
  data: {
    name: Language;
    id: string;
    description: Images;
    location: { lat: number; lon: number };
    event_dates: { starting_day: string };
  };
}

type Language = {
  en: string;
  fi: string;
};
interface Imageobj {
  url: string;
}
type Images = {
  images: Imageobj[];
};

interface ReviewDataObject {
  comment: string;
  rating: number;
  writtenBy: string;
  createdDate: string;
}
interface LocationInterface {
  longitude: number;
  latitude: number;
}
const ItemCard: React.FC<Props> = ({ type, data }) => {
  const { state, dispatch } = useContext(Store);

  const [reviews, setReviews] = useState<ReviewDataObject[]>([]);
  const [mylocation, setMyLocation] = useState<LocationInterface>({
    latitude: 0,
    longitude: 0,
  });
  const myDistance = getDistance(
    mylocation, // my position this is just dummy data
    { latitude: data.location.lat, longitude: data.location.lon } // restourant position
  );
  useEffect(() => {
    if (state.location) {
      setMyLocation(state.location);
    } else {
      setMyLocation({ latitude: 0, longitude: 0 });
    }
    return () => {};
  }, []);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/reviews/GetReviews/${data.id}`,
      {
        method: "GET",
        signal: abortCont.signal,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((el) => {
        if (el.status === 200) {
          return el.json();
        } else {
          console.log("Error something went wrong!");
        }
      })
      .then((el) => {
        if (el.isSuccs) {
          setReviews(el.data);
        } else {
          console.log(el, "FAILED");
        }
      })
      .catch((err) => console.log(err));

    return () => {
      abortCont.abort();
    };
  }, [data.id]);

  // Calculates AVG Rating value (a is Accumulator ,let it stay there , when its a.key doesnt work , JS https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce )
  const arrAvg = (arr: any) =>
    arr.reduce((a: any, b: any) => a + b.rating, 0) / arr.length;

  if (!data) {
    return (
      <div>
        <h1>Loading..</h1>
      </div>
    );
  } else if (data.description.images === null) {
    return <div></div>;
  } else if (type === "events") {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: `/allbyid/${type}/${data.id}/`,
          state: {
            id: data.id,
            type: type,
          },
        }}
      >
        {" "}
        <ItemsCard>
          <div
            className="card-img"
            style={{
              backgroundImage: `url("${
                data.description.images.length
                  ? data.description.images[0].url
                  : noImage
              }")`,
            }}
          ></div>
          <p>{data.name.en ? data.name.en : data.name.fi}</p>
          <p style={{ fontSize: "12px", color: "#727272" }}>
            {moment(
              data.event_dates
                ? data.event_dates.starting_day
                : "No Info starting day"
            ).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          <div
            style={{
              borderTop: "1px solid #ccc",
              borderRadius: "0px",
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              margin: "0 auto",
              color: "#999898",
              fontFamily: "Open-sans,sans-serif",
            }}
          >
            {" "}
            <span>
              {reviews.length ? (
                arrAvg(reviews).toFixed(1)
              ) : (
                <span style={{ fontSize: "10px" }}>not rated</span>
              )}{" "}
              <FaGrinStars color="#999898" />
            </span>
            {!mylocation.latitude && !mylocation.longitude ? (
              <span>
                <MdGpsOff />
              </span>
            ) : (
              <span>{(myDistance / 1000).toFixed(1)}km</span>
            )}
          </div>
        </ItemsCard>
      </Link>
    );
  } else
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: `/allbyid/${type}/${data.id}/`,
          state: {
            id: data.id,
            type: type,
          },
        }}
      >
        <ItemsCard>
          <div
            className="card-img"
            style={{
              backgroundImage: `url("${
                data.description.images.length
                  ? data.description.images[0].url
                  : noImage
              }")`,
            }}
          ></div>
          <p
            style={{
              overflow: "hidden",
              width: "80%",
              margin: "10px auto",
              height: "40px",
            }}
          >
            {data.name.en}
          </p>

          <div
            style={{
              borderTop: "1px solid #ccc",
              borderRadius: "0px",
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              margin: "0 auto",
              color: "#999898",
              fontFamily: "Open-sans,sans-serif",
            }}
          >
            {" "}
            <span>
              {reviews.length ? (
                arrAvg(reviews).toFixed(1)
              ) : (
                <span style={{ fontSize: "10px" }}>not rated</span>
              )}{" "}
              <FaGrinStars color="#999898" />
            </span>
            {!mylocation.latitude && !mylocation.longitude ? (
              <span>
                <MdGpsOff />
              </span>
            ) : (
              <span>{(myDistance / 1000).toFixed(1)}km</span>
            )}
          </div>
        </ItemsCard>
      </Link>
    );
};

export default ItemCard;
