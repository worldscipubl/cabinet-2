import React, { forwardRef } from "react";
import classNames from "classnames";
import "./ChatMessage.scss";

const ChatMessage = forwardRef(
  (
    {
      direction = false,
      avatar = "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png",
      name = "No name",
      text = "",
      date = "",
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames("chat-message", {
          "chat-message_right": direction,
        })}
      >
        <img className="chat-message__img" src={avatar} />
        <div className="chat-message-bubble">
          <div className="chat-message__info">
            <div className="chat-message__info-name text text_weight_bold">
              {name}
            </div>
            <div className="chat-message__info-time text">{date}</div>
          </div>
          <div className="chat-message__text text">{text}</div>
        </div>
      </div>
    );
  }
);

export default ChatMessage;
