import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classNames from "classnames";
import ReferralTableHeader from "./ReferralTableHeader";
import TableRow from "../../../../../components/Table/TableRow";
import TableCell from "../../../../../components/Table/TableCell";
import TableContainer from "../../../../../components/Table/TableContainer";
import Table from "../../../../../components/Table";
import TableBody from "../../../../../components/Table/TableBody";
import Paper from "../../../../../components/Paper";
import { getDate } from "../../../../../utils/functions";
import cn from "./ReferralPayoutTable.module.scss";

const ReferralPayoutTable = ({ className, data, isLoading }) => {
  if (!data) return <h3 className="text">empty</h3>;

  const SkeletonRow = () => {
    return [1, 2, 3].map((id) => (
      <TableRow key={id}>
        <TableCell className={classNames(cn.TableCell)}><Skeleton /></TableCell>
        <TableCell className={classNames(cn.TableCell)}><Skeleton /></TableCell>
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
            : data.map(({ sum, date, walletName, walletValue }) => (
              <TableRow key={walletValue + date}>
                <TableCell className={classNames(cn.TableCell, cn.TableCellFirst)}>{walletName}</TableCell>
                <TableCell
                  className={classNames(cn.TableCell, cn.TableCellReg)}>
                  {getDate(date, true)}
                </TableCell>
                <TableCell
                  className={classNames(cn.TableCell)}>
                  {sum}
                </TableCell>
                <TableCell className={classNames(cn.TableCell)}>{walletValue}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ReferralPayoutTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default ReferralPayoutTable;
