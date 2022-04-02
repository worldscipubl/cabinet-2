import React from "react";
import classNames from "classnames";
import Spoiler from "../../../components/Spoiler/Spoiler";
import CardHeadband from "../../../components/CardHeadband";
import cn from "./FaqSection.module.scss";

const FaqSection = ({ className, name = "Безымянная категория", items }) => {
  return (
    <CardHeadband className={classNames(cn.Wrapper, className)} title={name}>
      <ul className={classNames(cn.List)}>
        {items &&
          items.map(({ id, question, answer }) => (
            <Spoiler title={question} key={id}>
              <p className={classNames(cn.Answer, "text")}>{answer}</p>
            </Spoiler>
          ))}
      </ul>
    </CardHeadband>
  );
};

export default FaqSection;
