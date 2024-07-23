import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/CustomerReviews.css";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import ReviewsContainer from "../components/ReviewsContainer";

const initialReviews = [
  {
    name: "John Doe",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel lorem et massa efficitur semper. Donec sagittis justo ac dui bibendum, in aliquet metus lacinia. Vestibulum sit amet risus vitae est congue ultricies. Cras ac ligula id odio consectetur tincidunt non id elit. Proin sit amet lacus eget quam interdum posuere. Aliquam erat volutpat. Nulla facilisi. Suspendisse potenti. Phasellus ac dolor sit amet neque ullamcorper tincidunt a at lacus. Nulla facilisi. ",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment:
      "Curabitur non urna id ante facilisis hendrerit ac vitae erat. Nam ut est et metus ultricies hendrerit ut eget tortor. Praesent vestibulum sapien eget est vehicula, sed dictum odio varius.",
  },
  {
    name: "Michael Johnson",
    rating: 3,
    comment:
      "Vivamus nec libero sit amet mauris vehicula volutpat. Fusce vitae magna non urna vehicula ullamcorper ac a odio. Aliquam erat volutpat. Donec varius urna at est suscipit fringilla. Nullam sollicitudin nibh nec est bibendum, non tincidunt orci pellentesque. Morbi tristique augue ut mauris dictum, a viverra orci tincidunt. ",
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment:
      "Sed nec dui fringilla, pharetra libero ac, blandit urna. Mauris id eros eget odio consectetur congue eu quis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
  },
  {
    name: "John Doe",
    rating: 5,
    comment: "Great service and friendly staff!",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment:
      "Nam interdum dui vel augue scelerisque, vitae auctor risus tristique. Donec sit amet tortor vitae arcu congue gravida. Nulla aliquet eros nec diam dignissim, non vestibulum nulla pretium.",
  },
  {
    name: "Michael Johnson",
    rating: 3,
    comment:
      "Cras tincidunt risus id neque laoreet, non tempor sapien dictum. Fusce pharetra ipsum at ante sollicitudin, vel cursus lorem pellentesque. Proin vestibulum erat at quam euismod, eget fringilla sapien aliquet. Etiam sed eros id dolor consequat posuere.",
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment:
      "Nam interdum dui vel augue scelerisque, vitae auctor risus tristique. Donec sit amet tortor vitae arcu congue gravida. Nulla aliquet eros nec diam dignissim, non vestibulum nulla pretium. Cras tincidunt risus id neque laoreet, non tempor sapien dictum. Fusce pharetra ipsum at ante sollicitudin, vel cursus lorem pellentesque. Proin vestibulum erat at quam euismod, eget fringilla sapien aliquet. Etiam sed eros id dolor consequat posuere.",
  },
  {
    name: "John Doe",
    rating: 5,
    comment:
      "Vivamus nec libero sit amet mauris vehicula volutpat. Fusce vitae magna non urna vehicula ullamcorper ac a odio. Aliquam erat volutpat. Donec varius urna at est suscipit fringilla. Nullam sollicitudin nibh nec est bibendum, non tincidunt orci pellentesque. Morbi tristique augue ut mauris dictum, a viverra orci tincidunt. Praesent et diam vel justo convallis consequat. Ut fermentum urna non sollicitudin cursus. Nam at ligula nec ante efficitur vehicula. Quisque ultrices libero eget purus aliquet, eu cursus odio fringilla. Sed sit amet nisi a lacus sodales scelerisque. ",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment:
      "Nam at ligula nec ante efficitur vehicula. Quisque ultrices libero eget purus aliquet, eu cursus odio fringilla. Sed sit amet nisi a lacus sodales scelerisque.",
  },
  {
    name: "Michael Johnson",
    rating: 3,
    comment:
      "Nulla aliquet eros nec diam dignissim, non vestibulum nulla pretium. Cras tincidunt risus id neque laoreet, non tempor sapien dictum. Fusce pharetra ipsum at ante sollicitudin, vel cursus lorem pellentesque.",
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment:
      "Cras tincidunt risus id neque laoreet, non tempor sapien dictum. Fusce pharetra ipsum at ante sollicitudin, vel cursus lorem pellentesque. Proin vestibulum erat at quam euismod, eget fringilla sapien aliquet. Etiam sed eros id dolor consequat posuere.",
  },
];

const CustomerReviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  // const handleLike = (index) => {
  //   const updatedReviews = [...reviews];
  //   updatedReviews[index].likes += 1;
  //   setReviews(updatedReviews);
  // };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].comment += `\n\nComment: ${newComment}`;
    setReviews(updatedReviews);
    setNewComment("");
  };

  return (
    <div className="container">
      <div className="reviews-container">
        <h2>Customer Reviews</h2>
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="review-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3>{review.name}</h3>
            <div className="rating">
              {Array(review.rating)
                .fill()
                .map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
            </div>
            <p>{review.comment}</p>
            <div className="review-actions">
              <button onClick={handleLike}>
                <FontAwesomeIcon icon={faHeart} size="2x" />
                {likes}
              </button>
              {/* <button onClick={() => handleCommentSubmit(index)}>
              Add Comment
            </button> */}
            </div>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment..."
            />
            <Button>Post Comment</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
