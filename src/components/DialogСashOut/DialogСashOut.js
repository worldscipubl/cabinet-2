import React, { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import Dialog from "../Dialog";
import DialogHeader from "../DialogHeader";
import DialogBody from "../DialogBody";
import FieldBuilder from "../FieldBuilder";
import DialogSubmit from "../DialogSubmit";
import { useCashOutMoneyMutation } from "../../api/endpoints/PayoutsApi";
import { useGetWalletsQuery } from "../../api/endpoints/WalletsApi";
import cn from "./DialogСashOut.module.scss";
import { number } from "prop-types";

const DialogCashOut = ({ className }) => {
  const [isOpen, setOpen] = useState(false);
  const [cashOutMoney, { error }] = useCashOutMoneyMutation();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: wallets, isLoading: isLoadingWallets } = useGetWalletsQuery();

  function handleBtn(e) {
    e.preventDefault();
    setOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      walletId: values?.["walletId"],
      sum: Number(values?.["sum"]),
    };
    cashOutMoney(data)
      .unwrap()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handlerField(name, value, err) {
    if (!err) setValues((prevState) => ({ ...prevState, [name]: value }));
    else setErrors((prevState) => ({ ...prevState, [name]: err }));
  }

  useEffect(() => {
    if (!isOpen) {
      setValues(null);
      setErrors(null);
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <Fragment>
      <button
        className={classNames(className, "button button_type_tabs")}
        onClick={handleBtn}
      >
        Вывести денежные средства
      </button>
      <Dialog
        className={classNames(cn.Wrapper)}
        open={isOpen}
        setOpen={setOpen}
      >
        <DialogHeader
          label="Вывод денежных средств"
          handleClose={() => setOpen(false)}
        />
        <DialogBody isLoading={isLoading}>
          <FieldBuilder
            className={classNames(cn.FieldItem)}
            name="walletId"
            // isLoading={isLoadingWallets}
            type="select"
            label="Выберите карту"
            handlers={{ handlerField }}
            options={wallets}
          >
            <WalletItem onClick={handlerField} />
          </FieldBuilder>
          <FieldBuilder
            className={classNames(cn.FieldItem)}
            name="sum"
            type="number"
            label="Введите сумму"
            defaultValue={values?.["sum"] || ""}
            defaultError={errors?.["sum"] || ""}
            handlers={{ handlerField }}
          />
        </DialogBody>
        <DialogSubmit
          handleSubmit={handleSubmit}
          error={error}
          disable={isLoading}
          label="Вывести"
        />
      </Dialog>
    </Fragment>
  );
};

const WalletItem = ({ item, onClick }) => {
  const { id, name, value } = item || {};
  return (
    <li
      className={classNames(cn.option, "text text_size_default")}
      onClick={() => onClick({ value: id, label: name })}
    >
      <span className={classNames()}>{name}</span>
      <span className={classNames("text_color_gray")}>{value}</span>
    </li>
  );
};

export default DialogCashOut;
