export const BASE_URL = "https://api.worldscipubl.com/v1";
export const TEST_USER = {
    username: "rayec89552@aline9.com",
    // password: "DzeG3Jx@}G$p"
    password: "21FFS)*Fa"
};

export const languageOptions = [
    {
        id: "ru",
        label: "Русский",
        icon: ""
    },
    {
        id: "en",
        label: "Английский",
        icon: ""
    },
    {
        id: "de",
        label: "Немецкий",
        icon: ""
    }
];
export const currencyOptions = [
    {
        id: "rub",
        label: "Рубли",
        icon: ""
    },
    {
        id: "usd",
        label: "Доллар США",
        icon: ""
    },
    {
        id: "eur",
        label: "Евро",
        icon: ""
    }
];
export const articlePipelineStages = [
    {title: "Технический аудит", stage: 1},
    {title: "Заключение договора", stage: 2},
    {title: "Перевод на академический английский язык", stage: 3},
    {
        title:
            "Предварительная экспертная оценка действующим рецензентом международного журнала",
        stage: 4
    },
    {title: "Таргетированный подбор журнала", stage: 5},
    {title: "Научное редактирование", stage: 6},
    {title: "Вычитка носителем языка", stage: 7},
    {title: "Финальная подготовка к отправке в журнал", stage: 8},
    {title: "Подача в журнал", stage: 9},
    {title: "Сопровождение на этапах рецензирования", stage: 10},
    {title: "Публикация и индексация статьи", stage: 11}
];
export const fieldsArticleRequestForm = [
    {
        name: "name",
        label: "ФИО",
        placeholder: "Укажите ФИО"
    },

    {
        name: "post",
        label: "Должность",
        placeholder: "Укажите должность"
    },

    {
        name: "country",
        label: "Страна",
        placeholder: "Укажите страна"
    },

    {
        name: "articleSubject",
        label: "Тема",
        placeholder: "Укажите тему"
    },

    {
        name: "universityName",
        label: "Университет",
        placeholder: "Укажите университет"
    },

    {
        name: "wishes",
        label: "Пожелания",
        placeholder: "Ваши пожелания"
    },

    {
        name: "NewArticle[file]",
        label: "Файл статьи",
        placeholder: "Загрузите статью",
        type: "file"
    }
];
export const fieldsAddCard = [
    {
        name: "name",
        label: "Название карты",
        placeholder: "Visa"
    },

    {
        name: "value",
        label: "Номер карты",
        placeholder: "0000 0000 0000 0000"
    },
]
