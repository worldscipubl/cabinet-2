import React, { forwardRef, useEffect, useRef } from "react";
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
      isLast = false,
      isFirst = false,
      user
    },
    ref
  ) => {
    const refAvatar = useRef();

    useEffect(() => {
      if (refAvatar.current && isFirst) refAvatar.current.scrollIntoView();
    }, []);

    return (
      <div
        ref={isLast ? ref : null}
        className={classNames("chat-message", {
          "chat-message_right": !direction,
        })}
      >
        <img className="chat-message__img" src={!direction ? user.avatar : avatar} ref={refAvatar} />
        <div className="chat-message-bubble">
          <div className="chat-message__info">
            <div className="chat-message__info-name text text_weight_bold">
              {!direction ? user.name : "Без имени"}
            </div>
            <div className="chat-message__info-time text">{date.toLocaleString()}</div>
          </div>
          <div className="chat-message__text text">{text}</div>
        </div>
      </div>
    );
  }
);

export default ChatMessage;
