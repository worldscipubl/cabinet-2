import React, {useState} from "react";
import classNames from "classnames";
import FieldBuilder from "../../../components/FieldBuilder";
import Card from "../../../components/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import { useApplyArticleMutation } from "../../../api/endpoints/ArticlesApi";
import { fieldsArticleRequestForm } from "../../../utils/constants";
import PreloadingScreen from "../../../components/PreloadingScreen";

const ArticleRequest = () => {

  const briefForm = document.forms.briefform

  const [applyArticle, {}] = useApplyArticleMutation();
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handlerField = (name, value, err) => {
    if (!err) setValues((prevState) => ({ ...prevState, [name]: value }));
    else setErrors((prevState) => ({ ...prevState, [name]: err }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!validationForm()) return;
    const data = new FormData(briefForm);

    setIsLoading(true)

    applyArticle(data)
      .then((res) => {
        console.log(res);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  };

  const validationForm = () => {
    return fieldsArticleRequestForm
      .map(({ name, placeholder }) => {
        const isValid = values.hasOwnProperty(name) && !!values[name];
        !isValid &&
          setErrors((prevState) => ({ ...prevState, [name]: placeholder }));
        return isValid;
      })
      .every((el) => el);
  };

  if (isLoading) {
    return (
      <>
        <p className="text text_size_accent text_weight_bold text_align_center">Подождите.... <br/>Идет отправка заявки на сервер</p>
        <PreloadingScreen isLoading={isLoading}/>
      </>
    )
  }

  return (
    <div>
      <Card appearance={{ type: "paper" }}>
        <CardHeader>
          <h3 className="text text_size_title text_weight_bold text_align_center">
            Загрузите свою работу в личный кабинет
          </h3>
        </CardHeader>
        <CardBody>
            <form name="briefform"  className={classNames("brief-form", {})} key={"RegFormInputs"} >
            {fieldsArticleRequestForm.map((field) => {
              return (
                <FieldBuilder
                  className="brief-form__input"
                  key={field?.name}
                  name={field?.name}
                  type={field?.type}
                  label={field?.label}
                  description={field?.description}
                  defaultError={errors[field?.name] || ""}
                  handlers={{ handlerField }}
                />
              );
            })}

              <button
                className="button button_type_main brief-form__submit"
                onClick={handlerSubmit}
              >
                Отправить
              </button>
          </form>
          {/*<button*/}
          {/*  className="button button_type_main brief-form__submit"*/}
          {/*  onClick={handlerSubmit}*/}
          {/*>*/}
          {/*  Отправить*/}
          {/*</button>*/}
        </CardBody>
      </Card>
    </div>
  );
};

export default ArticleRequest;
