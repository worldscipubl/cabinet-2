import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogHeader from "../DialogHeader";
import DialogBody from "../DialogBody";
import { fieldsAddCard } from "../../utils/constants";
import FieldBuilder from "../FieldBuilder";
import classNames from "classnames";
import Dialog from "../Dialog";
import { useAddWalletMutation } from "../../api/endpoints/WalletsApi";
import cn from "./DialogAddCard.module.scss";
import DialogSubmit from "../DialogSubmit";

const DialogAddCard = ({ className, open, setOpen }) => {
  const [addWallet, { error }] = useAddWalletMutation();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const validationForm = () => {
    return fieldsAddCard
      .map(({ name, placeholder }) => {
        const isValid = values.hasOwnProperty(name) && !!values[name];
        !isValid &&
          setErrors((prevState) => ({ ...prevState, [name]: placeholder }));
        return isValid;
      })
      .every((el) => el);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validationForm()) return;
    setLoading(true);

    addWallet(values)
      .unwrap()
      .then((res) => {
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handlerField = (name, value, err) => {
    if (!err) setValues((prevState) => ({ ...prevState, [name]: value }));
    else setErrors((prevState) => ({ ...prevState, [name]: err }));
  };

  useEffect(() => {
    if (!open) {
      setValues(null);
      setErrors(null);
    }
  }, [open]);

  return (
    <Dialog className={className} open={open} setOpen={setOpen}>
      <DialogHeader label="Добавить карту" handleClose={() => setOpen(false)} />
      <DialogBody isLoading={isLoading}>
        <AddCardForm
          values={values}
          errors={errors}
          handlerField={handlerField}
        />
      </DialogBody>
      <DialogSubmit
        handleSubmit={handleSubmit}
        error={error}
        label="Добавить карту"
      />
    </Dialog>
  );
};

const AddCardForm = ({ values, errors, handlerField }) =>
  fieldsAddCard.map(({ name, type, label }) => {
    return (
      <FieldBuilder
        className={classNames(cn.FieldItem)}
        name={name}
        type={type}
        label={label}
        key={name}
        defaultValue={values?.[name] || ""}
        defaultError={errors?.[name] || ""}
        handlers={{ handlerField }}
      />
    );
  });

DialogAddCard.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DialogAddCard;
