import React from "react";
import unionImg from "../../common/images/logo/union.svg";
import clientImg from "../../common/images/illustrations/client.svg";
import "./Card.scss";

const Card = ({ type, children, isUnion, isClient }) => {
  const style = `card ${type ? "card_type_" + type : ""}`;
  return (
    <div className={style}>
      <div className="card__inner">{children}</div>
      {isUnion && <img className="card__union" src={unionImg} alt="union" />}
      {isClient && (
        <img className="card__bg-img" src={clientImg} alt="client" />
      )}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="card__header">{children}</div>;
};

export const CardBody = ({ children }) => {
  return <div className="card__main">{children}</div>;
};

export const CardFooter = ({ children }) => {
  return (
    <div className="card__footer card__footer_align_center">{children}</div>
  );
};

export default Card;
