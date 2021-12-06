import Review from "./Review.jsx";
import { useState, useEffect } from "react";

const Reviews = (props) => {
  const { productId } = props;
  const [reviews, setReviews] = useState(null);

  const getReviews = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/products/${productId}/reviews`
      );
      const data = await response.json();
      setReviews(data);
      return reviews;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="reviews">
      {reviews &&
        reviews.map((review) => {
          return <p>{review.comment}</p>;
        })}
    </div>
  );
};

export default Reviews;
