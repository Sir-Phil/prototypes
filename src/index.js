import moment from "moment";
import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "./index.css";

function Tweet({tweet}) {
  return (
    <div className="tweet">
      <Avatar hash={tweet.gravatar} />
      <div className="content">
        <Author author={tweet.author} />
        <Time time={tweet.timestamp} />
        <Message text={tweet.message} />
        <div className="buttons">
          <ReplyButton />
          <RetweetButton count={tweet.retweet} />
          <LikeButton count={tweet.like} />
          <MoreOptionButton />
        </div>
      </div>
    </div>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.object
}

const testTweet = {
  message: "The Power of coding with destructuring",
  gravatar: "XYZ",
  author: {
    handle: "CodeJaminator_Series",
    name: "Code Beta"
  },
  like: 24,
  retweet: 4,
  timestamp: "2022-03-09 17:02:45"
};

function Avatar({hash}) {
  const url = `https://www.gravatar.com/avatar/nothing/${hash}`;
  return (
    <img
      src={url}
      className="avatar"
      alt="avatar"
    />
  );
}

Avatar.propTypes = {
  hash: PropTypes.string
}

function Message ({text}) {
  return (
    <div className="message">
      {text}
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string
}

function Author ({author}) {
  const {
    name,
    handle 
  } = author;
  return (
    <span className="author">
      <span className="name">{name}</span>
      <span className="handle">@{handle}</span>
    </span>
  );
}

Author.propTypes = {
  author: PropTypes.shape ({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired
  }).isRequired
};

const Time = ({time}) => {
  const timeString = moment(time).fromNow();
  return (
     <span className="time">
       {timeString}
       </span>
  );
};
  
Time.propTypes = {
  time: PropTypes.any
};
 


const ReplyButton = () => (
  <i className="fa fa-reply reply-button"/>
);

function getRetweetCount(count) {
  if(count > 0) {
    return (
      <span className="retweet-count">
        {count}
      </span>
    );
  }else {
    return null;
  }
}

const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className="fa fa-retweet" />
    {getRetweetCount(count)}
  </span>
);

RetweetButton.propTypes = {
  count: PropTypes.number
};

const LikeButton = ({count}) => (
  <span className="like-button">
    <i className="fa fa-heart"/>
    {count > 0 && 
    <span className="like-count">
      {count}
    </span> }
  </span>
);

LikeButton.propTypes = {
  count: PropTypes.number
};


const MoreOptionButton = () => (
  <i className="fa fa-ellipsis-h more-option-button"/>
);

ReactDom.render(<Tweet tweet={testTweet} />, document.querySelector("#root"));
