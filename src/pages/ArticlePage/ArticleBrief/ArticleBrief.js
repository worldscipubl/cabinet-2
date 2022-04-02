import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import ViewPager from "../../../components/ViewPager/ViewPager";
import "./ArticleBrief.scss";
import {
  useAddArticleMutation,
  useAddContactMutation,
  useGetArticleQuery,
  useGetContactQuery,
} from "../../../api/endpoints/BriefApi";
import BriefForm from "../../../components/BriefForm/BriefForm";
import AuthorForm from "../../../components/AuthorForm/AuthorForm";

const ArticleBrief = ({ articleId, statusId }) => {
  const [statePages, setStatePages] = useState({
    0: false,
    1: false,
    2: false,
  });
  const [isLoadingPage, setLoadingPage] = useState(false);

  const checkValidationForm = (key, status) => {
    setStatePages({ ...statePages, [key]: status });
  };

  const checkLoading = (stateLoading) => {
    setLoadingPage(stateLoading);
  };

  const handleNext = () => {
    return true;
  };

  const handleBack = () => {
    return true;
  };

  const handleReset = () => {
    return true;
  };

  const getTabs = () => {
    return ["О статье", "Об авторе", "Сооавторы"];
  };

  const getPages = (step) => {
    switch (step) {
      case 0:
        return (
          <BriefForm
            key="BriefFormArticle"
            nameForm={0}
            useQuery={useGetArticleQuery}
            useMutation={useAddArticleMutation}
            fields={fieldsArticle}
            articleId={articleId}
            isViewOnly={statusId >= 9}
            checkValidationForm={checkValidationForm}
            checkLoading={checkLoading}
          />
        );
      case 1:
        return (
          <BriefForm
            key="BriefFormContact"
            nameForm={1}
            useQuery={useGetContactQuery}
            useMutation={useAddContactMutation}
            fields={fieldsContact}
            articleId={articleId}
            isViewOnly={statusId >= 9}
            checkValidationForm={checkValidationForm}
            checkLoading={checkLoading}
          />
        );
      case 2:
        return (
          <AuthorForm
            key="BriefAuthorForm"
            nameForm={2}
            fields={fieldsAuthors}
            fieldsSecond={fieldsRegForm}
            articleId={articleId}
            isViewOnly={statusId >= 9}
          />
        );
      case 3:
        return "All steps completed - you&apos;re finished";
      default:
        return null;
    }
  };

  return (
    <div>
      <Card appearance={{ type: "paper" }}>
        <h2 className="text text_size_subtitle brief-form__description">
          Форма заключения договора
        </h2>
        <ViewPager
          tabs={getTabs()}
          pages={getPages}
          handlers={{
            handleNext,
            handleBack,
            handleReset,
          }}
          options={{
            initStep: 0,
            hideActionBar: isLoadingPage,
            hideBackBtn: false,
            clickableTabs: !!(statusId >= 9),
            nextBtnLabel: "Далее",
            backBtnLabel: "Назад",
            resetBtnLabel: "Сбросить",
            finishBtnLabel: "Завершить",
            statePages: statePages,
          }}
        />
      </Card>
    </div>
  );
};

const fieldsArticle = [
  {
    name: "articleSubject",
    label: "Тематика статьи",
    placeholder: "Укажите тематику статьи",
  },

  {
    name: "articleName",
    label: "Название статьи",
    placeholder: "Укажите название статьи",
  },

  {
    name: "articleAuthor",
    label: "Авторы статьи",
    placeholder: "Укажите авторов статьи",
  },

  {
    name: "universityAddress",
    label: "Адрес ВУЗа",
    placeholder: "Укажите адрес ВУЗа",
  },

  {
    name: "universityName",
    label: "Название ВУЗа",
    placeholder: "Укажите название ВУЗа",
  },
];
const fieldsContact = [
  {
    name: "academicStatus",
    label: "Академический статус",
    placeholder: "Укажите академический статус",
  },

  {
    name: "post",
    label: "Должность",
    placeholder: "Укажите должность",
  },

  {
    name: "birthday",
    label: "Дата рождения",
    placeholder: "Укажите дату рождения",
  },

  {
    name: "passportSerialNumber",
    label: "Серия и номер паспорта",
    placeholder: "Укажите серию и номер паспорта",
  },

  {
    name: "passportRegistration",
    label: "Прописка",
    placeholder: "Укажите прописку",
  },

  {
    name: "passportDepartmentCode",
    label: "Код подразделения",
    placeholder: "Укажите код подразделения",
  },

  {
    name: "passportWhoIssued",
    label: "Кем выдан паспорт",
    placeholder: "Укажите кем выдан паспорт",
  },

  {
    name: "passportWhenIssued",
    label: "Когда выдан паспорт",
    placeholder: "Укажите когда выдан паспорт",
  },

  {
    type: "file",
    name: "uploadedPassport",
    label: "Загрузить скан паспорта",
    placeholder: "Загрузите скан паспорта",
  },
];
const fieldsAuthors = [
  {
    name: "name",
    label: "ФИО",
    placeholder: "Укажите ФИО",
  },

  {
    name: "scientificDegree",
    label: "Ученая степень",
    placeholder: "Укажите ученую степень",
  },

  {
    name: "academicStatus",
    label: "Ученое звание",
    placeholder: "Укажите ученое звание",
  },

  {
    name: "position",
    label: "Должность",
    placeholder: "Укажите должность",
  },

  {
    name: "work",
    label: "Основное место работы",
    description: "название организации, факультет, кафедра, юридический адрес",
    placeholder: "Укажите название организации",
  },

  {
    name: "phone",
    label: "Контактный телефон",
    placeholder: "Укажите телефон",
  },

  {
    name: "email",
    label: "Контактный e-mail",
    placeholder: "Укажите e-mail",
  },
];
const fieldsRegForm = [
  {
    name: "articleNameRu",
    label: "Название статьи на русском",
    placeholder: "Укажите название статьи",
  },

  {
    name: "articleNameEn",
    label: "Название статьи на английском",
    placeholder: "Укажите название статьи",
  },

  {
    name: "journalParams",
    label: "Параметры журнала (ИФ/ квартиль/процентиль)",
    placeholder: "Укажите параметры журнала",
    description:
      "данное поле подлежит заполнению, если нормативными документами вуза или мин. образования предусмотрены особые требования к журналам",
  },

  {
    name: "journalSubjectArea",
    label: "Предметные области журнала",
    placeholder: "Укажите предметные области журнала",
    description:
      "*если поле оставлено пустым, статья публикуется в журнале, который будет определен как оптимальный сотрудниками компании",
  },
  {
    name: "grantsInfo",
    label: "Благодарности и информация об использовании грантов",
    placeholder: "Укажите благодарности и гранты",
  },
];

export default ArticleBrief;
