import React from "react";
import { useInfinityScroll } from "../utils";
import { ChatMessages } from "./index";

const ChatInfiniteScroll = ({ articleId }) => {
  const [lastElementRef, { messages, error, isLoading }] =
    useInfinityScroll(articleId);
  return (
    <div className="chat-box__body">
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        error={error}
        ref={lastElementRef}
      />
    </div>
  );
};

export default ChatInfiniteScroll;
