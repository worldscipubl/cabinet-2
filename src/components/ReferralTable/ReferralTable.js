import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classNames from "classnames";
import TableContainer from "../Table/TableContainer";
import Table from "../Table";
import Paper from "../Paper";
import ReferralTableHeader from "./ReferralTableHeader";
import TableBody from "../Table/TableBody";
import TableRow from "../Table/TableRow";
import TableCell from "../Table/TableCell";
import cn from "./ReferralTable.module.scss";
import { getDate } from "../../utils/functions";

const ReferralTable = ({ className, data, isLoading }) => {
  if (!data) return <h3 className="text">empty</h3>;

  const SkeletonRow = () => {
    return [1, 2, 3].map((id) => (
      <TableRow key={id}>
        <TableCell className={classNames(cn.TableCell, cn.TableCellID)}><Skeleton /></TableCell>
        <TableCell className={classNames(cn.TableCell, cn.TableCellUser)}><Skeleton /></TableCell>
        <TableCell className={classNames(cn.TableCell, cn.TableCellReg)}><Skeleton /></TableCell>
        <TableCell className={classNames(cn.TableCell)}><Skeleton /></TableCell>
        <TableCell className={classNames(cn.TableCell)}><Skeleton /></TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer className={className} component={Paper}>
      <Table>
        <ReferralTableHeader />
        <TableBody className={classNames(cn.TableBody)}>
          {isLoading ? <SkeletonRow />
            : data.map(({ id, name, dateRegistration, datePay, sum }) => (
              <TableRow key={id}>
                <TableCell className={classNames(cn.TableCell, cn.TableCellID)}>{id}</TableCell>
                <TableCell className={classNames(cn.TableCell, cn.TableCellUser)}>{name}</TableCell>
                <TableCell
                  className={classNames(cn.TableCell, cn.TableCellReg)}>
                  Регистрация <br />
                  {getDate(dateRegistration)}
                </TableCell>
                <TableCell
                  className={classNames(cn.TableCell)}>
                  {datePay ? "Оплата" : "Ожидание оплаты"}
                  <br />
                  {datePay && getDate(datePay)}
                </TableCell>
                <TableCell className={classNames(cn.TableCell)}>{sum}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ReferralTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default ReferralTable;
