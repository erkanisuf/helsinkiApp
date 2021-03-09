import React, { useEffect, useState } from "react";
import { FaGrinStars } from "react-icons/fa";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
interface Props {
  id: string;
  succs: string;
}

interface ReviewDataObject {
  comment: string;
  rating: number;
  writtenBy: string;
  createdDate: string;
}
const ShowReviews: React.FC<Props> = ({ id, succs }) => {
  const [reviews, setReviews] = useState<ReviewDataObject[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/GetReviews/${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((el) => {
        if (el.status === 200) {
          return el.json();
        } else {
          console.log("Error something went wrong!");
        }
      })
      .then((el) => {
        if (el.isSuccs) {
          console.log(el.data);
          setReviews(el.data);
        } else {
          console.log(el, "FAILED");
        }
      })
      .catch((err) => console.log(err));
    return () => {};
  }, [id, succs]);

  if (!reviews.length) {
    return <div>No reviews added yet!</div>;
  } else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          height: "300px",
          width: "400px",
          padding: "5px",
          fontFamily: "Open-sans,sans-serif",
        }}
      >
        <div>
          {reviews.map((el, index) => {
            return (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  margin: "5px",
                  width: "90%",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <StarRatingComponent
                    name="rate3"
                    starCount={5}
                    editing={false}
                    starColor={"#0093e9"}
                    renderStarIcon={() => (
                      <span>
                        <FaGrinStars
                          style={{ margin: "5px", fontSize: "15px" }}
                        />
                      </span>
                    )}
                    value={el.rating}
                  />
                  <p style={{ margin: "0 auto" }}>{el.comment}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginTop: "10px",
                    color: "#ccc",
                    fontStyle: "italic",
                    fontSize: "12px",
                    fontFamily: "Open-sans,sans-serif",
                  }}
                >
                  <div>{el.writtenBy}</div>
                  <div>{moment(el.createdDate).format("MMMM.DD.YYYY")}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default ShowReviews;
