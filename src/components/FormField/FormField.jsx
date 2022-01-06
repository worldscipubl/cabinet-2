import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import "react-loading-skeleton/dist/skeleton.css";
import errorImg from "../../common/images/icons/error.svg";
import pencilImg from "../../common/images/icons/pencil.svg";
import styles from "./FormField.module.scss";
import FormFieldContainer from "../FormFieldContainer";

const FormField = ({
                       className,
                       component,
                       name,
                       label,
                       isLoading,
                       description,
                       defaultValue,
                       defaultError = null,
                       isViewOnly = false,
                       propsInput = {},
                       helperText = "Нажмите Enter, чтобы сохранить изменения",
                       options: {startIcon, endIcon} = {},
                       handlers: {handleFieldSubmit, handleFieldFileSubmit} = {}
                   }) => {
    const [value, setValue] = useState(defaultValue);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState(defaultError);
    const [disabled, setDisabled] = useState(false);
    const [isReadOnly, setReadOnly] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        setValue(defaultValue);
        setError(defaultError);
        setDisabled(false);
        setReadOnly(true);
        setFileName("");
    }, [defaultValue, defaultError]);

    useEffect(() => {
        if (error !== defaultError) setError(defaultError);
    }, [defaultError, error]);

    function resetField() {
        setValue(defaultValue);
        setError(defaultError);
        setDisabled(false);
        setReadOnly(true);
        setFileName("");
    };

    const handleBlur = (event) => {
        !disabled && !error && resetField();
    };
    const handleKeyDown = (event) => {
        if (!event) return;

        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        const key = event.key;
        if (!key) return;

        if (key === "Escape") {
            resetField();
        } else if (key === "Enter") {
            submitField();
        }
    };

    const submitField = () => {
        if (!!error || !handleFieldSubmit) return;
        setReadOnly(true);
        setDisabled(true);

        handleFieldSubmit(name, value)
            .catch((err) => {
                resetField();
                setError(err);
            });
    };

    const submitFieldFile = () => {
        if (!!error || !handleFieldFileSubmit) return;
        setReadOnly(true);
        setDisabled(true);

        const formData = new FormData();
        // TODO: userTypeFileId <- Должен приходить извне
        formData.append("userTypeFileId", 1);

        for (let i = 0; i < value.length; i++) {
            formData.append("UserFile[file][]", value[i]);
        }

        console.log(formData);
        handleFieldFileSubmit(formData)
            .catch((err) => {
                resetField();
                setError(err);
            });
    };

    const handleChange = (event) => {
        const input = event.target;
        if (!input) return;

        if (input.type === "file") {
            const files = input?.files;
            if (!files) {
                setError("Ошибка!");
            } else {
                setError("");
            }
            setFileName(files[0]?.name);
            setValue(files);
        } else {
            const value = input?.value;
            //  Пропустить value через переданный валидатор
            if (!input.validity.valid) {
                setError("Ошибка!");
            } else {
                setError("");
            }
            //  Пропустить value через маску
            setValue(value);
        }
    };

    return (
        <FormFieldContainer label={label}
                            description={description}
                            isLoading={isLoading}
                            error={error}
                            helperText={helperText}
                            isReadOnly={isReadOnly}
                            disabled={disabled}>
            <>
                {isReadOnly && !!error && (
                    <img className={styles.startIcon} src={errorImg} alt="start-icon"/>
                )}

                {isReadOnly && !isViewOnly && (
                    <img
                        className={styles.endIcon}
                        src={pencilImg}
                        alt="end-icon"
                        onClick={() => {
                            if (propsInput.type === "file") {
                                inputRef.current.click();
                            } else {
                                if (inputRef) inputRef.current.focus();
                                setReadOnly(false);
                            }
                        }}
                    />
                )}

                {isReadOnly && !isViewOnly && (!defaultValue || fileName) && (
                    <i className={classNames("button button_type_tabs active", styles.actionBtn)}
                       onClick={() => {
                           if (fileName) {
                               submitFieldFile();
                               return;
                           }

                           if (propsInput.type === "file")
                               inputRef.current.click();
                           else {
                               if (inputRef) inputRef.current.focus();
                               setReadOnly(false);
                           }
                       }}>
                        {fileName ? "Отправить" : "Добавить"}
                    </i>
                )}

                {component && <component.type
                    className={classNames(styles.textField__input)}
                    inputRef={inputRef}
                    {...propsInput}
                    name={name}
                    readOnly={isReadOnly || false}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fileName={fileName || ""}
                    value={value || ""}
                />}
            </>
        </FormFieldContainer>
    );
};

export default FormField;
