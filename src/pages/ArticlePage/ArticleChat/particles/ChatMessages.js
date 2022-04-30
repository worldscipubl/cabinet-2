import React, { forwardRef } from "react";
import EmptyState from "../../../../domain/EmptyState";
import ChatMessage from "../../../../components/ChatMessage";
import Loader from "../../../../components/Loader/Loader";
import PreloadingScreen from "../../../../components/PreloadingScreen";

const ChatMessages = forwardRef(({ error, messages, isLoading }, ref) => {
  if (isLoading) return <Loader />;
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

      <PreloadingScreen isLoading={isLoading} />

      // <EmptyState
      //   title="Сообщений пока нет"
      //   imgName="no_data"
      //   description="Тут будет история вашей переписки"
      // />
    );

  return (
    <>
      {messages.map(
        ({ articleMessageId, dateCreate, files, role, text }, index, array) => (
          <ChatMessage
            date={dateCreate}
            direction={!!role}
            text={text}
            key={index}
            isLast={array.length === index + 1}
            isFirst={index === 0}
            ref={ref}
            files={files}
          />
        )
      )}

      {isLoading && <h2>isLoading</h2>}
    </>
  );
});

export default ChatMessages;
