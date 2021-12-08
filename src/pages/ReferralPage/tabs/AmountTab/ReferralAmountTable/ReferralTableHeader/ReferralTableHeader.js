import React from "react";
import classNames from "classnames";
import cn from "../ReferralAmountTable.module.scss";
import TableHead from "../../../../../../components/Table/TableHead";
import TableRow from "../../../../../../components/Table/TableRow";
import TableCell from "../../../../../../components/Table/TableCell";


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
