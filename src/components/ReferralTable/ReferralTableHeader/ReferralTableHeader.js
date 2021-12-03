import React from "react";
import classNames from "classnames";
import TableHead from "../../Table/TableHead";
import TableCell from "../../Table/TableCell";
import TableRow from "../../Table/TableRow";
import cn from "../ReferralTable.module.scss";


const ReferralTableHeader = () => {
  return (
    <TableHead className={classNames(cn.TableHead)}>
      <TableRow>
        <TableCell className={classNames(cn.TableCell, cn.TableCellID)}>ID</TableCell>
        <TableCell className={classNames(cn.TableCell, cn.TableCellUser)}>Пользователь</TableCell>
        <TableCell className={classNames(cn.TableCell, cn.TableCellReg)}>Регистрация</TableCell>
        <TableCell className={classNames(cn.TableCell)}>Стутус</TableCell>
        <TableCell className={classNames(cn.TableCell)}>Сумма</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ReferralTableHeader;
