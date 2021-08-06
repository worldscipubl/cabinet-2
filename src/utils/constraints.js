const constraints = {
  name: {
    msg: "Как к Вам обращаться?",
  },

  phone: {
    msg: "Недопустимый номер телефона!",
    pattern: "^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$",
  },

  email: {
    msg: "Недопустимый email!",
    pattern:
      "[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
  },

  subject: {
    msg: "Не указана тематика!",
  },

  link: {
    msg: "Укажите ссылку на профиль!",
  },

  firstName: {
    msg: "Как к Вам обращаться?",
  },

  lastName: {
    msg: "Как к Вам обращаться?",
  },

  coupon: {
    msg: "Введите промокод!",
  },

  file: {
    msg: "Загрузите файл!",
  },
};

export default constraints;
