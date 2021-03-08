import React, { useState } from "react";
import { FormEvent } from "react";
import StarRatingComponent from "react-star-rating-component";
import { FaGrinStars } from "react-icons/fa";
import { FormColumnFlex, ReviewTextArea } from "../StyledComponents/Styles";
interface PostReview {
  rating: number;
  comment: string;
}
const PostReview = () => {
  const [starHover, setStarHover] = useState<number>(5);
  const [review, setReview] = useState<PostReview>({
    rating: starHover,
    comment: "",
  });

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };
  const changeRating = (e: number) => {
    setStarHover(e);
    setReview({ ...review, rating: e });
  };
  const onStarHover = (e: number) => {
    console.log(review);
    setStarHover(e);
  };
  const onStarHoverOut = (e: number) => {
    setStarHover(e);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "80%",
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <FormColumnFlex>
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
          placeholder="Write a review."
          required
          onChange={handleTextArea}
        />

        <input type="submit" value="Submit" />
      </FormColumnFlex>
      <div>
        <p>No Comments yet</p>
      </div>
    </div>
  );
};

export default PostReview;
