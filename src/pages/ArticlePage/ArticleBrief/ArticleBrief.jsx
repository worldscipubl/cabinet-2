import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import ViewPager from "../../../components/ViewPager/ViewPager";
import AuthorForm from "../../../components/ArticleBriefForms/AuthorForm";
import "../../../components/DatePicker/DatePicker.scss";
import "./ArticleBrief.scss";
import {
  useGetArticleQuery,
  useGetContactQuery
} from "../../../api/endpoints/BriefApi";
import BriefForm from "../../../components/ArticleBriefForms/BriefForm";

const ArticleBrief = ({ children, articleId }) => {
  const [stateForms, setStateForms] = useState({
    "BriefFormArticle": false,
    "BriefFormContact": false,
    "BriefFormAuthors": false
  });

  const getStatusForm = (key, status) => {
    setStateForms({ ...stateForms, [key]: status });
  };

  const handleNext = () => {
    console.log("handleNext");
    return false;
  };

  const handleBack = () => {
    console.log("handleBack");
    return true;
  };

  const handleReset = () => {
    console.log("handleReset");
    return true;
  };

  const getSteps = () => {
    return ["О статье", "Об авторе", "Сооавторы"];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BriefForm
            key="BriefFormArticle"
            nameForm="BriefFormArticle"
            useQuery={useGetArticleQuery}
            useQueryParams={articleId}
            fields={fieldsArticle}
            articleId={articleId}
            getStatusForm={getStatusForm}
          />
        );
      case 1:
        return (
          <BriefForm
            key="BriefFormContact"
            useQuery={useGetContactQuery}
            fields={fieldsContact}
            articleId={articleId}
          />
        );
      case 2:
        return <AuthorForm fields={fieldsAuthors} articleId={articleId} />;
      case 3:
        return "All steps completed - you&apos;re finished";
      default:
        return null;
    }
  };

  return (
    <Card appearance={{ type: "paper" }}>
      <h2 className="text text_size_subtitle brief-form__description">
        Форма заключения договора
      </h2>
      <ViewPager
        steps={getSteps()}
        pages={getStepContent}
        handlers={{
          handleNext,
          handleBack,
          handleReset
        }}
        options={{
          initStep: 0,
          hideBackBtn: false,
          clickableTabs: true,
          nextBtnLabel: "Далее",
          backBtnLabel: "Назад",
          resetBtnLabel: "Сбросить",
          finishBtnLabel: "Завершить"
        }}
      />
    </Card>
  );
};

const fieldsArticle = [
  {
    name: "articleSubject",
    label: "Тематика статьи"
  },

  {
    name: "articleName",
    label: "Название статьи"
  },

  {
    name: "articleAuthor",
    label: "Авторы статьи"
  },

  {
    name: "universityAddress",
    label: "Адрес ВУЗа"
  },

  {
    name: "universityName",
    label: "Название ВУЗа"
  }
];
const fieldsContact = [
  {
    name: "academicStatus",
    label: "Академический статус"
  },

  {
    name: "post",
    label: "Должность"
  },

  {
    name: "birthday",
    label: "Дата рождения"
  },

  {
    name: "passportSerialNumber",
    label: "Серия и номер паспорта"
  },

  {
    name: "passportRegistration",
    label: "Прописка"
  },

  {
    name: "passportDepartmentCode",
    label: "Код подразделения"
  },

  {
    name: "passportWhoIssued",
    label: "Кем выдан паспорт"
  },

  {
    name: "passportWhenIssued",
    label: "Когда выдан паспорт"
  },

  {
    type: "file",
    name: "BriefContact[file][]",
    label: "Загрузить скан паспорта"
  }
];
const fieldsAuthors = [
  {
    name: "name",
    label: "ФИО"
  },

  {
    name: "scientificDegree",
    label: "Ученая степень"
  },

  {
    name: "academicStatus",
    label: "Ученое звание"
  },

  {
    name: "position",
    label: "Должность"
  },

  {
    name: "work",
    label: "Основное место работы",
    description: "название организации, факультет, кафедра, юридический адрес"
  },

  {
    name: "phone",
    label: "Контактный телефон"
  },

  {
    name: "email",
    label: "Контактный e-mail"
  }
];

export default ArticleBrief;
