import React from "react";
import classNames from "classnames";
import cn from "../ProfileMenu.module.scss";

const ProfileMenuHoc = (Component) => {
  return ({ ...props }) => (
    <div className={classNames(cn.Wrapper)}>
      <Component {...props} />
    </div>
  );
};

export default ProfileMenuHoc;
