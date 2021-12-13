import React, { useEffect, useState } from "react";
import {
  useLazyGetMessagesByArticleQuery,
  useSendMessagesByArticleMutation
} from "../../api/endpoints/ChatApi";
import "./ChatBox.scss";
import ChatMessageForm from "./ChatMessageForm";
import ChatListMessages from "./ChatListMessages";

const ChatBox = ({ articleId }) => {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [trigger, {
    data: { data: newMessages, currentPage, pageCount } = {},
    error,
    isLoading
  }] = useLazyGetMessagesByArticleQuery();
  const [messagesMutation, { error: errorSubmit } = {}] = useSendMessagesByArticleMutation();

  const handlePagination = (page) => {
    setPage(prevState => prevState === currentPage ? prevState + 1 : prevState);
  };

  const handleSubmit = ({ message, messageFile }) => {
    return new Promise((resolve, reject) => {
      const sendData = { articleId: articleId, message, "MessageArticleForm[file][]": messageFile };
      messagesMutation(sendData)
        .unwrap()
        .then((res) => {
          resolve("success");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  useEffect(() => {
    if (!newMessages?.length) return;
    if (currentPage === page)
      setMessages(prevMessages => [...newMessages, ...prevMessages]);
    else
      setMessages(prevMessages => [...prevMessages, ...newMessages]);
  }, [newMessages, currentPage, page]);

  useEffect(() => {
    if (!Number.isInteger(page)) return;
    if (page === 0) return;
    trigger({ articleId, page });
  }, [page, articleId, trigger]);

  return (
    <div className="chat-box" id="chat-box">
      <ChatListMessages messages={messages} error={error}
                        handlePagination={handlePagination}
                        isLoading={isLoading}
                        currentPage={currentPage}
                        pageCount={pageCount} />
      <ChatMessageForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatBox;
