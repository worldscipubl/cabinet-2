import React from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import IonIcon from "../../IonIcon";
import cn from "./ProfileMenuList.module.scss";


const ProfileMenuList = ({ handleOpenMenu }) => {
  const history = useHistory();

  const items = [
    {
      name: "Настройки",
      icon: "settings-outline",
      onClick() {
        history.push("/settings");
        handleOpenMenu?.(false);
      }
    },
    {
      name: "Помощь",
      icon: "help-circle-outline",
      onClick() {
        history.push("/faq");
        handleOpenMenu?.(false);
      }
    },
    {
      name: "Выйти",
      icon: "log-out-outline",
      onClick() {
        localStorage.setItem("user_token", JSON.stringify(""));
        history.push("/");
        document.location.reload();
      }
    }
  ];

  return (
    <ul className={classNames(cn.List)}>
      {items && items.map(({ name, icon, onClick }) => (
        <li className={classNames(cn.Item)} onClick={onClick} key={name}>
          <IonIcon className={classNames(cn.ItemIcon)} name={icon} />
          <span className={classNames(cn.ItemLabel, "text")}>{name}</span>
        </li>
      ))}
    </ul>
  );
};

export default ProfileMenuList;
