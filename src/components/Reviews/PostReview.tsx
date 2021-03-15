import React, { useContext, useState } from "react";
import { FormEvent } from "react";
import StarRatingComponent from "react-star-rating-component";
import { FaGrinStars } from "react-icons/fa";
import { FormColumnFlex, ReviewTextArea } from "../StyledComponents/Styles";
import { Cookies } from "react-cookie";
import { Store } from "../../Context/AppContext";
import ShowReviews from "./ShowReviews";
interface PostReview {
  rating: number;
  comment: string;
}
interface Props {
  id: string;
}
const PostReview: React.FC<Props> = ({ id }) => {
  const { state, dispatch } = useContext(Store);
  const cookies = new Cookies();
  const usercookie = cookies.get("loged_in");
  const [starHover, setStarHover] = useState<number>(5);
  const [review, setReview] = useState<PostReview>({
    rating: starHover,
    comment: "",
  });
  const [error, setError] = useState<string>("");
  const [succs, setSuccs] = useState<string>("");

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review, comment: e.target.value });
  };
  const changeRating = (e: number) => {
    setStarHover(e);
    setReview({ ...review, rating: e });
  };
  const onStarHover = (e: number) => {
    setStarHover(e);
    setReview({ ...review, rating: e });
  };
  const onStarHoverOut = (e: number) => {
    setStarHover(e);
    setReview({ ...review, rating: e });
  };

  const PostReview = (e: React.FormEvent): void => {
    e.preventDefault();
    const sendingData = {
      rating: review.rating,
      comment: review.comment,
      writtenBy: state.loged_email,
      placeId: id,
      createdDate: new Date().toISOString(),
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/PostReview`, {
      method: "POST",
      body: JSON.stringify(sendingData),
      headers: {
        Authorization: `Bearer ${usercookie}`,
        "Content-Type": "application/json",
      },
    })
      .then((el) => {
        if (el.status === 200) {
          return el.json();
        } else if (el.status === 401) {
          console.log("Not loged in!");
          setError("Not loged in!");
        } else {
          console.log("error , failed to fetch");
          setError("error , failed to post!");
        }
      })
      .then((el) => {
        if (el.isSuccs) {
          setSuccs("Your reviews has been added!");
          setError("");
        } else {
          setError(el.error);
          setSuccs("");
        }
      })
      .catch((err) => setError("Something went Wrong"));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: window.innerWidth <= 768 ? "column" : "row",
        width: "80%",
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <FormColumnFlex onSubmit={PostReview}>
        <StarRatingComponent
          name="rate1"
          onStarHover={onStarHover}
          onStarHoverOut={onStarHoverOut}
          starCount={5}
          starColor={"#0093e9"}
          renderStarIcon={() => (
            <span>
              <FaGrinStars style={{ margin: "5px", fontSize: "30px" }} />
            </span>
          )}
          value={starHover}
          onStarClick={changeRating}
        />

        <ReviewTextArea
          name="comment"
          rows={10}
          cols={60}
          placeholder={
            !state.is_loged_in ? "Please login to review" : "Write a review."
          }
          required
          disabled={!state.is_loged_in ? true : false}
          onChange={handleTextArea}
        />

        <input
          type="submit"
          value={!state.is_loged_in ? "Disabled" : "Submit"}
          disabled={!state.is_loged_in ? true : false}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {succs && <p style={{ color: "green" }}>{succs}</p>}
      </FormColumnFlex>
      <div>
        <ShowReviews id={id} succs={succs} />
      </div>
    </div>
  );
};

export default PostReview;
