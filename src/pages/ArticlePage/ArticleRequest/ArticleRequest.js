import React, {useState} from "react";
import classNames from "classnames";
import FieldBuilder from "../../../components/FieldBuilder";
import Card from "../../../components/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import {useApplyArticleMutation} from "../../../api/endpoints/ArticlesApi";
import {fieldsArticleRequestForm} from "../../../utils/constants";

const ArticleRequest = () => {
    const [applyArticle, {}] = useApplyArticleMutation();
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handlerField = (name, value, err) => {
        if (!err)
            setValues(prevState => ({...prevState, [name]: value}));
        else
            setErrors(prevState => ({...prevState, [name]: err}));
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (!validationForm()) return;
        applyArticle(values)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
            console.log(err);
        });
    };

    const validationForm = () => {
        return fieldsArticleRequestForm.map(({name, placeholder}) => {
            const isValid = values.hasOwnProperty(name) && !!values[name];
            !isValid && setErrors(prevState => ({...prevState, [name]: placeholder}));
            return isValid;
        }).every((el) => el);
    };

    return (
        <div>
            <Card appearance={{type: "paper"}}>
                <CardHeader>
                    <h3 className="text text_size_title text_weight_bold text_align_center">
                        Загрузите свою работу в личный кабинет
                    </h3>
                </CardHeader>
                <CardBody>
                    <div className={classNames("brief-form", {})} key={"RegFormInputs"}>
                        {fieldsArticleRequestForm.map((field) => {
                            return <FieldBuilder
                                className="brief-form__input"
                                key={field?.name}
                                name={field?.name}
                                type={field?.type}
                                label={field?.label}
                                description={field?.description}
                                defaultError={errors[field?.name] || ""}
                                handlers={{handlerField}}/>;
                        })}
                    </div>
                    <button className="button button_type_main brief-form__submit" onClick={handlerSubmit}>Отправить
                    </button>
                </CardBody>
            </Card>
        </div>
    );
};

export default ArticleRequest;
