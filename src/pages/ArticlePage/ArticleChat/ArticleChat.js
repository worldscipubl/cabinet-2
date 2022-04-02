import React, { useEffect, useState } from "react";
import { useLazyGetMessagesByArticleQuery } from "../../../api/endpoints/ChatApi";
import { ChatInfiniteScroll, ChatMessageForm } from "./particles";
import "./ArticleChat.scss";

const ArticleChat = ({ articleId }) => {
  return (
    <div className="chat-box">
      <ChatInfiniteScroll articleId={articleId} />
      <ChatMessageForm articleId={articleId} />
    </div>
  );
};

export default ArticleChat;
