import React from "react";
import classNames from "classnames";
import TableHead from "../../../../../../components/Table/TableHead";
import TableRow from "../../../../../../components/Table/TableRow";
import TableCell from "../../../../../../components/Table/TableCell";
import cn from "../ReferralPayoutTable.module.scss";

const ReferralTableHeader = () => {
  return (
    <TableHead className={classNames(cn.TableHead)}>
      <TableRow>
        <TableCell className={classNames(cn.TableCell, cn.TableCellFirst)}>Название</TableCell>
        <TableCell className={classNames(cn.TableCell)}>Дата</TableCell>
        <TableCell className={classNames(cn.TableCell)}>Сумма</TableCell>
        <TableCell className={classNames(cn.TableCell)}>Кошелек</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ReferralTableHeader;
