import React, {forwardRef, useEffect, useState} from "react";
import EmptyState from "../../../../domain/EmptyState";
import ChatMessage from "../../../../components/ChatMessage";
import Loader from "../../../../components/Loader/Loader";
import authApiFetch from "../../../../api/ApiFetch/AuthApiFetch";
import {getTokenMessaging} from "../../../../firebase";

const ChatMessages = forwardRef(({ error, messages, isLoading }, ref) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    authApiFetch.loginUser(localStorage.getItem('user_token'))
      .then(res => {
        setUser(res)
      })
      .catch(err => {
        console.log(err)
      })

  }, []);

  // if (isLoading) return <Loader />;
  if (error)
    return (
      <EmptyState
        type="warning"
        title="Упс... Произошла ошибка!"
        description={error.message}
      />
    );

  if (!(Array.isArray(messages) && !!messages.length))
    return (
      isLoading
        ?
        <Loader />
        :
        <EmptyState
          title="Сообщений пока нет"
          imgName="no_data"
          description="Тут будет история вашей переписки"
        />
    );

  return (
    <>
      {messages.map(
        ({ articleMessageId, dateCreate, files, role, text }, index, array) => (
          <ChatMessage
            date={new Date(Number(dateCreate+"000"))}
            direction={!!role}
            text={text}
            key={index}
            isLast={array.length === index + 1}
            isFirst={index === 0}
            ref={ref}
            files={files}
            user={user}
          />
        )
      )}

      {isLoading && <Loader />}
    </>
  );
});

export default ChatMessages;
