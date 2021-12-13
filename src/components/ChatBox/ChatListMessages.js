import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import ChatMessage from "../ChatMessage/ChatMessage";
import InfiniteScroll from "react-infinite-scroller";

const ChatListMessages = ({ messages, error, isLoading, currentPage, pageCount, handlePagination }) => {
  const [fetching, setFetching] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const parentScrollRef = useRef(null);

  useEffect(() => {
    setFetching(false);
  }, [messages]);

  const handleScroll = (page) => {
    if (fetching || page < 2) return;
    setFetching(true);
    handlePagination(page);
  };

  useEffect(() => {
    const options = {
      root: parentScrollRef.current,
      rootMargin: "20%",
      threshold: 0
    };

    const handleObserver = ((entries) => {
      const [entry] = entries;
      if (!entry) return;
      const entryName = entry.target.dataset.name;
      if (entry.isIntersecting && entryName) {
        console.log("handleObserver:", entryName);
        handlePagination && handlePagination(entryName);
      }
    });

    const observer = new IntersectionObserver(handleObserver, options);
    const prevRefCurrent = prevRef.current;
    const nextRefCurrent = nextRef.current;

    if (prevRefCurrent) observer.observe(prevRef.current);
    if (nextRefCurrent) observer.observe(nextRef.current);

    return () => {
      if (prevRefCurrent) observer.unobserve(prevRefCurrent);
      if (nextRefCurrent) observer.unobserve(nextRefCurrent);
    };

  }, [prevRef, nextRef, handlePagination]);

  const Messages = ({ data }) => {
    // if (isLoading) return <Loader />;
    if (error) return <h2 className="text text_align_center text_color_red">{error}</h2>;
    if (!(Array.isArray(data) && !!data.length))
      return <h3 className="text">Сообщений пока нет</h3>;

    const messages = data.map(({ dateCreate, files, role, text }, index) => (
      <ChatMessage date={dateCreate}
                   direction={!!role}
                   text={text}
                   ref={(data.length - 1) === index ? nextRef : null}
                   key={index} />
    ));

    return (<>
      {messages}
    </>);
  };


  return (
    <div className="chat-box__body">
      <InfiniteScroll
        pageStart={0}
        isReverse
        loadMore={handleScroll}
        hasMore={(currentPage !== pageCount)}
        useWindow={false}
        loader={<Loader key={0} />}
      >
        <Messages data={messages} />
      </InfiniteScroll>
    </div>
  );
};

export default ChatListMessages;
