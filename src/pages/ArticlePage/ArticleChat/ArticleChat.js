import React, { useEffect, useState } from "react";
import { useLazyGetMessagesByArticleQuery } from "../../../api/endpoints/ChatApi";
import { ChatInfiniteScroll, ChatMessageForm } from "./particles";
import "./ArticleChat.scss";
import {useHistory, useParams} from "react-router-dom";

const ArticleChat = () => {

  const history = useHistory()
  const {articleId, tabId} = useParams()

  console.log(useParams())

  useEffect( () => {
    history.push(`/article/${articleId}/article-chat`)
  },[])

  return (
    <div className="chat-box">
      <ChatInfiniteScroll articleId={articleId} />
      <ChatMessageForm articleId={articleId} />
    </div>
  );
};

export default ArticleChat;
