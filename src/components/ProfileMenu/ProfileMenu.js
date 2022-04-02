import React, { useState, Fragment, useEffect } from "react";
import ProfileMenuList from "./ProfileMenuList";
import ProfileMenuCard from "./ProfileMenuCard";
import ProfileMenuHoc from "./ProfileMenuHOC";
import SelectOption from "./SelectOption";
import { currencyOptions, languageOptions } from "../../utils/constants";

const ProfileMenu = ({ open, setOpen }) => {
  const [openSelect, setOpenSelect] = useState("");

  useEffect(() => {
    if (!open) setTimeout(() => setOpenSelect(""), 250);
  }, [open]);

  switch (openSelect) {
    case "language":
      return (
        <SelectOption
          handleSelect={setOpenSelect}
          options={languageOptions}
          title="Выбрать язык"
        />
      );
    case "currency":
      return (
        <SelectOption
          handleSelect={setOpenSelect}
          options={currencyOptions}
          title="Выбрать валюту"
        />
      );
    default:
      return (
        <Fragment>
          <ProfileMenuCard handleSelect={setOpenSelect} />
          <ProfileMenuList handleOpenMenu={setOpen} />
        </Fragment>
      );
  }
};

export default ProfileMenuHoc(ProfileMenu);
