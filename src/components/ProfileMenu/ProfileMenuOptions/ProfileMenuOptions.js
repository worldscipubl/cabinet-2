import React, { useEffect } from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import IonIcon from "../../IonIcon";
import { useGetCurrentCurrencyQuery, useGetCurrentLangQuery } from "../../../api/endpoints/I18nApi";
import cn from "./ProfileMenuOptions.module.scss";

const ProfileMenuOptions = ({ className, handleSelect }) => {
  const { data: lang, error: errorLang, isLoading: isLoadingLang } = useGetCurrentLangQuery();
  const { data: currency, error: errorCurrency, isLoading: isLoadingCurrency } = useGetCurrentCurrencyQuery();

  // TODO: Убрать статику и сделать отображение валюты и языка из полей объектв user

  return (
    <ul className={classNames(cn.Options, className)}>
      <li className={classNames(cn.Option)} onClick={() => handleSelect("language")}>
        <p className={classNames(cn.OptionLabel, "text", "text_color_gray")}>
          Язык
        </p>
        <p className={classNames(cn.OptionLabel, "text")}>
          {isLoadingLang ? <Skeleton className={classNames(cn.Skeleton)} /> : "(RU) Русский"}
        </p>
        <i className={classNames(cn.OptionIcon)}>
          <IonIcon className={classNames()} name="language-outline" />
        </i>
      </li>
      <li className={classNames(cn.Option)} onClick={() => handleSelect("currency")}>
        <p className={classNames(cn.OptionLabel, "text text_color_gray")}>
          Валюта
        </p>
        <p className={classNames(cn.OptionLabel, "text")}>
          {isLoadingCurrency ? <Skeleton className={classNames(cn.Skeleton)} /> : "(RUB) Рубли"}
        </p>
        <i className={classNames(cn.OptionIcon)}>
          <IonIcon className={classNames()} name="card-outline" />
        </i>
      </li>
    </ul>
  );
};

export default ProfileMenuOptions;
