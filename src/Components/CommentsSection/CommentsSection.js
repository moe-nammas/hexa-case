import React from "react";
import CommentCard from "../CommentCard/CommentCard";
import "./CommentsSection.scss";

const CommentsSection = ({ comments }) => {
  return (
    <div className="comments-section-container">
      {comments.map((item) => (
        <CommentCard
          key={item.comment}
          comment={item.comment}
          commentBy={item.commentedBy}
          commentAt={item.commentAt}
        />
      ))}
    </div>
  );
};

export default CommentsSection;
