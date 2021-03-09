import React, { useEffect, useState } from "react";
import { ItemsCard } from "../Styles";
import noImage from "../../../staticimages/No_Image_Available.jpg";
import { getDistance } from "geolib"; // For Distance LIbary
import { Link } from "react-router-dom";
import { FaGrinStars } from "react-icons/fa";
interface Props {
  type: string;
  data: {
    name: Language;
    id: string;
    description: Images;
    location: { lat: number; lon: number };
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
const ItemCard: React.FC<Props> = ({ type, data }) => {
  const myDistance = getDistance(
    { latitude: 60.17626, longitude: 24.938082 }, // my position this is just dummy data
    { latitude: data.location.lat, longitude: data.location.lon } // restourant position
  );

  const [reviews, setReviews] = useState<ReviewDataObject[]>([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/reviews/GetReviews/${data.id}`,
      {
        method: "GET",

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

    return () => {};
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
          <div> {(myDistance / 1000).toFixed(1)}km</div>
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
          <p>{data.name.en}</p>

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
              {reviews.length ? arrAvg(reviews).toFixed(1) : "unrated"}{" "}
              <FaGrinStars color="#999898" />
            </span>
            <span>{(myDistance / 1000).toFixed(1)}km</span>
          </div>
        </ItemsCard>
      </Link>
    );
};

export default ItemCard;
