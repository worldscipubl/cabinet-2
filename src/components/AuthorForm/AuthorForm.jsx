import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import "./AuthorForm.scss";
import Tabs from "../../layouts/Tabs/Tabs";
import Loader from "../Loader";
import Input from "../Input/Input";
import Field from "../Field/Field";
import { useAddAuthorsMutation, useGetAuthorsQuery } from "../../api/endpoints/BriefApi";
import FromErrorList from "../FromErrorList/FromErrorList";
import { instanceOf } from "prop-types";

const AuthorForm = ({ fields, fieldsSecond, articleId }) => {
  const { data: { authorInfo, regInfo } = {}, error, isLoading } = useGetAuthorsQuery(articleId);
  const [mutationBrief, { error: errorSubmit } = {}] = useAddAuthorsMutation();
  const [valueAuthors, setValueAuthors] = useState([]);
  const [errorAuthors, setErrorAuthors] = useState({});
  const [valueReg, setValueReg] = useState(regInfo);
  const [errorReg, setErrorReg] = useState({});
  const [errForm, setErrForm] = useState([]);
  const [isLoadingForm, setLoadingForm] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (regInfo) setValueReg(regInfo);
    if (authorInfo && authorInfo.length) setValueAuthors([...authorInfo]);
  }, [authorInfo, regInfo]);

  useEffect(() => {
    console.log(errorAuthors);
  }, [errorAuthors]);


  const resetError = () => {
    setErrorAuthors({});
    setErrorReg({});
    setErrForm([]);
  };

  const validationForm = () => {
    resetError();
    let isValid = true;
    valueAuthors.map((author, idAuthor) => {
      fields.map(({ name, placeholder }) => {
        const isFieldValid = (author.hasOwnProperty(name) && !!author[name]);
        if (!isFieldValid) {
          isValid = false;
          setErrForm(prevState => [...prevState, `Автор ${idAuthor + 1}: ${placeholder} (данные об авторах)`]);
          setErrorAuthors(prevState => ({
            ...prevState,
            [`${idAuthor}_${name}`]: "Пожалуйста, заполните это поле"
          }));
        }
      });
    });

    fieldsSecond.map(({ name, placeholder }) => {
      const isFieldValid = (valueReg.hasOwnProperty(name) && !!valueReg[name]);
      if (!isFieldValid) {
        isValid = false;
        setErrForm(prevState => [...prevState, `${placeholder} (регистрационная форма)`]);
        setErrorReg(prevState => ({ ...prevState, [name]: "Пожалуйста, заполните это поле" }));
      }
    });

    return isValid;
  };

  const handlerFromSubmit = async () => {
    if (!validationForm()) return;

    const sendData = {
      articleId,
      ...valueReg,
      authorInfo: valueAuthors
    };

    setLoadingForm(true);
    await mutationBrief(JSON.stringify(sendData)).unwrap()
      .then((response) => {
        console.log(response);
        history.push(`/article/${articleId}/article-pipeline`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  const handlerAddTab = ({ tabs }) => {
    setValueAuthors(prevState => [...prevState, {}]);
    const label = `Автор ${tabs.length + 1}`;
    return (<AuthorFormInputs
      label={label} id={tabs.length} fields={fields} key={`BriefFormAuthors-${tabs.length + 1}`}
      errorAuthors={errorAuthors}
      handleChange={handleChange} />);
  };

  const handleChange = (idAuthor, name, value) => {
    if (Number.isInteger(idAuthor)) {
      setValueAuthors(prevState => idAuthor < prevState.length ?
        prevState.map((author, index) => (index === Number.parseInt(idAuthor)) ? {
            ...author,
            [name]: value
          } : author
        ) : [...prevState, { [name]: value }]);
    } else {
      setValueReg(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const RegFormInputs = () => {
    return (
      <div className={classNames("brief-form", {})} key={"RegFormInputs"}>
        {fieldsSecond.map((field) => {
          return <Field
            className="brief-form__input"
            name={field?.name}
            key={field?.name}
            label={field?.label}
            defaultValue={regInfo && regInfo[field?.name]}
            defaultError={errorReg && errorReg[field?.name]}
            description={field?.description}
            propsInput={{
              type: field?.type || "text",
              required: true
            }}
            component={<Input />}
            handlers={{ handleChange }}
          />;
        })}
      </div>
    );
  };

  if (isLoading) return <Loader />;
  if (error) return <h2 className="text text_align_center text_color_red">{error}</h2>;
  return (
    <div className={classNames("author-form", {
      loading: isLoadingForm
    })}>
      <h3 className="text text_size_subtitle brief-form__description">
        Заполните данные об авторах
      </h3>
      <Tabs
        options={{
          isExtensible: true,
          tabsLimit: 5
        }}
        handlers={{ handlerAddTab }}
      >
        {getContent({ fields, valueAuthors, errorAuthors, handleChange })}
      </Tabs>
      <hr />
      <h3 className="text text_size_subtitle brief-form__description">
        Заполните регистрационную форму
      </h3>
      {RegFormInputs()}
      <FromErrorList errorForm={errorSubmit || errForm} />
      <button className="button button_type_main active brief-form__submit" type="button" onClick={handlerFromSubmit}>
        {isLoadingForm ? "Данные обновляются..." : "Отправить данные для регистрационной формы"}
      </button>
      <Loader className="author-form__loader" />
    </div>
  );
};

const AuthorFormInputs = ({ label, id, fields, valueAuthors = [], errorAuthors = [], handleChange } = {}) => {
  return (
    <div className={classNames("brief-form", {})} key={"AuthorFormInputs" + id} label={label}>
      {fields.map((field) => {
        const defaultValue = valueAuthors && valueAuthors[id] && valueAuthors[id][field?.name];
        const defaultError = errorAuthors && errorAuthors[`${id}_${field?.name}`];
        return (<Field
          key={field?.name + id}
          className="brief-form__input"
          name={field?.name}
          idAuthor={id}
          label={field?.label}
          defaultValue={defaultValue}
          defaultError={defaultError}
          description={field?.description}
          propsInput={{
            type: field?.type || "text",
            required: true
          }}
          component={<Input />}
          handlers={{ handleChange }}
        />);
      })}
    </div>
  );
};

const getContent = ({ fields, valueAuthors, errorAuthors = {}, handleChange }) => {
  const isEmptyAuthors = !(Array.isArray(valueAuthors) && valueAuthors.length);
  if (isEmptyAuthors) return (<AuthorFormInputs
    label="Автор 1" id={1} fields={fields} key="1_0"
    errorAuthors={errorAuthors}
    handleChange={handleChange} />);
  return valueAuthors.map((author, index) => (<AuthorFormInputs
    label={`Автор ${index + 1}`} id={index} fields={fields} key={author + "_" + index}
    valueAuthors={valueAuthors}
    errorAuthors={errorAuthors}
    handleChange={handleChange} />)
  );
};

export default AuthorForm;
