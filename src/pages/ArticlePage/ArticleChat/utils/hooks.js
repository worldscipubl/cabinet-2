import { useCallback, useEffect, useRef, useState } from "react";
import { useGetMessagesByArticleMutation } from "../../../../api/endpoints/ChatApi";

export function useChatQuery(articleId) {
  const [messages, setMessages] = useState([]);
  const [
    trigger,
    { data: { currentPage = 0, hasMore = true } = {}, ...fetchState },
  ] = useGetMessagesByArticleMutation();

  function fetchMessages() {
    if (!hasMore) return;
    console.log("fetch page: ", currentPage + 1);
    trigger({ articleId, page: currentPage + 1 })
      .unwrap()
      .then((res) => {
        setMessages((prevMessages) =>
          [...prevMessages, ...res.messages].sort(
            (a, b) => b.dateCreate - a.dateCreate
          )
        );
      });
  }

  useEffect(() => {
    if (fetchMessages) fetchMessages();
  }, []);

  return [fetchMessages, hasMore, { messages, ...fetchState }];
}

export function useInfinityScroll(articleId) {
  const [fetchMessages, hasMore, { messages, isLoading, error }] =
    useChatQuery(articleId);
  const observerRef = useRef();
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  useEffect(() => {
    console.table(messages);
  }, [messages]);

  const handleIntersection = ([entry]) => {
    if (entry.isIntersecting && hasMore) {
      fetchMessages();
    }
  };

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        handleIntersection,
        options
      );
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return [lastElementRef, { messages, error, isLoading }];
}
