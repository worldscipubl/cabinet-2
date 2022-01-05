import React from "react";
import ChatBox from "../../../components/ChatBox/ChatBox";


const ArticleChat = ({ children, articleId }) => {
  return (
    <ChatBox articleId={articleId} />
  );
};

export default ArticleChat;
