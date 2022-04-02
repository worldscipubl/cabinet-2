import React from "react";
import classNames from "classnames";
import unionImg from "../../common/images/logo/union.svg";
import clientImg from "../../common/images/illustrations/client.svg";
import "./Card.scss";

const Card = ({
  className,
  children,
  isUnion,
  isClient,
  appearance: { type } = {},
}) => {
  const cardStyle = classNames("card", className, { [type]: type });

  return (
    <div className={cardStyle}>
      <div className="card__inner">{children}</div>
      {isUnion && <img className="card__union" src={unionImg} alt="union" />}
      {isClient && (
        <img className="card__bg-img" src={clientImg} alt="client" />
      )}
    </div>
  );
};

export default Card;
