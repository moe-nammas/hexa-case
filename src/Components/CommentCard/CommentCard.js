import React from "react";
import "./CommentCard.scss";
import defaultUserImg from "../../Assets/Images/default-user-img.png";
import moment from "moment";

const CommentCard = ({ comment, commentBy, commentAt }) => {
  return (
    <div className="comment-card-container">
      <div className="user-img-container">
        <img src={defaultUserImg} width="100%" height="100%" />
      </div>
      <div className="comment-body-container">
        <div className="comment-info">
          <label className="comment-by">{commentBy}</label>
          <label className="comment-date">
            {moment(commentAt).format("DD-MM-yyyy hh:mm a")}
          </label>
        </div>
        <div className="comment">
          <label>{comment}</label>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
