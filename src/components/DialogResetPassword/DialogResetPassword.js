import React, {Fragment, useEffect, useState} from 'react';
import classNames from "classnames";
import Dialog from "../Dialog";
import DialogHeader from "../DialogHeader";
import DialogBody from "../DialogBody";
import FieldBuilder from "../FieldBuilder";
import DialogSubmit from "../DialogSubmit";
import {useSetUserPasswordMutation} from "../../api/endpoints/UserApi";
import cn from "./DialogResetPassword.module.scss";

const DialogResetPassword = ({className}) => {
    const [isOpen, setOpen] = useState(false);
    const [setUserPassword, {error}] = useSetUserPasswordMutation();
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [errorMatch, setErrorMatch] = useState(null);
    const [isLoading, setLoading] = useState(false);

    function handleBtn(e) {
        e.preventDefault();
        setOpen(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const data = {password: values?.['first-password']};
        setUserPassword(data).unwrap()
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })

    }

    function checkMatch() {
        const isMatch = values?.['first-password'] === values?.['second-password'];
        if (isMatch)
            setErrorMatch(null);
        else
            setErrorMatch("Пароли не совпадают!");
    }

    function handlerField(name, value, err) {
        if (!err)
            setValues(prevState => ({...prevState, [name]: value}));
        else
            setErrors(prevState => ({...prevState, [name]: err}));
    };

    useEffect(checkMatch, [values]);

    useEffect(() => {
        if (!isOpen) {
            setValues(null);
            setErrors(null);
            setLoading(false);
        }
    }, [isOpen]);

    return (
        <Fragment>
            <button className={classNames(className, "button button_type_tabs")} onClick={handleBtn}>
                Изменить
            </button>
            <Dialog className={classNames(cn.Wrapper)} open={isOpen} setOpen={setOpen}>
                <DialogHeader label="Изменить пароль" handleClose={() => setOpen(false)}/>
                <DialogBody isLoading={isLoading}>
                    <FieldBuilder
                        className={classNames(cn.FieldItem)}
                        name="first-password" type="password"
                        label="Пароль" description="Введите новый пароль"
                        defaultValue={values?.["first-password"] || ""}
                        defaultError={errors?.["first-password"] || ""}
                        handlers={{handlerField}}
                    />
                    <FieldBuilder
                        className={classNames(cn.FieldItem)}
                        name="second-password" type="password"
                        label="Подтверждение пароля" description="Введите пароль еще раз"
                        defaultValue={values?.["second-password"] || ""}
                        defaultError={errors?.["second-password"] || ""}
                        handlers={{handlerField}}
                    />
                </DialogBody>
                <DialogSubmit handleSubmit={handleSubmit} error={error || errorMatch}
                              disable={!!errorMatch || isLoading} label="Изменить"/>
            </Dialog>
        </Fragment>
    );
};

export default DialogResetPassword;