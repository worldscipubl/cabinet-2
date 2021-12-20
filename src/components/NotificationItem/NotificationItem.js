import React, { useState } from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SpoilerArrow from "../SpoilerArrow";
import { getDate } from "../../utils/functions";
import { useLazyGetNotificationByIdQuery } from "../../api/endpoints/NotificationsApi";
import Loader from "../Loader";
import cn from "./NotificationItem.module.scss";

const NotificationItem = ({ id = 1, title, description, dateCreate, isRead, className, isLoadingItem }) => {
  const [getNotification, { data: { text } = {}, error, isLoading } = {}] = useLazyGetNotificationByIdQuery();
  const [isOpen, setOpen] = useState(false);

  function toggleAccordion() {
    setOpen(prevState => {
      const newState = !prevState;
      if (newState) fetchNotifies();
      return newState;
    });
  }

  function fetchNotifies() {
    getNotification(id);
  }

  return (
    <div className={classNames(cn.ItemWrapper)} onClick={toggleAccordion}>
      <div className={classNames(cn.Accordion, className, { [cn.isRead]: isRead })}>
        <div className={classNames(cn.AccordionHeader)}>
          <div className={classNames(cn.AccordionSubHeader)}>
          <span className="text text_size_default text_weight_bold">
            {isLoadingItem ? <Skeleton className={classNames(cn.Skeleton)} /> : title}
          </span>
            <span className="text text_weight_bold text_color_gray">
            {isLoadingItem ? <Skeleton className={classNames(cn.Skeleton)} /> : getDate(dateCreate)}
          </span>
          </div>
          <div className={classNames(cn.AccordionSubHeader)}>
          <span className="text">
            {isLoadingItem ? <Skeleton className={classNames(cn.Skeleton)} /> : description}
          </span>
            <SpoilerArrow isOpen={isOpen} />
          </div>
        </div>

        {!isLoadingItem &&
        <div className={classNames(cn.AccordionBody)} aria-expanded={!isOpen} onClick={(e) => e.stopPropagation()}>
          <div className={classNames(cn.AccordionInner)}>
            {error && <p className="text">{error}</p>}
            {isLoading && <Loader />}
            {text && <p className="text">{text}</p>}
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default NotificationItem;
