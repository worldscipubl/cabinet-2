class HTTPError extends Error {
  constructor(error) {
    super();
    error = this.handleError(error);

    this.name = error.name;
    this.details = error.details;

    this.message = Array.isArray(error.message)
      ? error.message
      : [error.message];
    this.status = error.status || "";
  }

  handleError(error) {
    const response = error.response;
    const request = error.request;

    if (response) {
      // client received an error response (5xx, 4xx)
      const status = response.status;
      const message = this.parseResponseDataMsg(response);
      const details = response;

      if (status === 400) {
        return {
          name: "BadRequestError",
          message: message || `Неверно введены данные (Код ${status})`,
          status,
          details,
        };
      }

      if (status === 401) {
        return {
          name: "UnauthorizedError",
          message:
            message || `Такой пары логин\\пароль не существет (Код ${status})`,
          status,
          details,
        };
      }

      if (status >= 400 && status < 500) {
        return {
          name: "ClientError",
          message: message || `Неверно введены данные (Код ${status})`,
          status,
          details,
        };
      }

      if (status >= 500 && status < 600) {
        return {
          name: "ServerError",
          message: message || `Ошибка сервера (Код ${status})`,
          status,
          details,
        };
      }
    } else if (request) {
      // client never received a response, or request never left
      return {
        name: "NetworkError",
        message:
          "Ошибка сети. Проверьте интернет-подключение или повторите попытку позже",
        details: request,
      };
    } else {
      // anything else
      return {
        name: "AxiosError",
        message: "Ошибка конфигурации",
        details: error.message,
      };
    }
  }

  parseResponseDataMsg(response) {
    try {
      return JSON.parse(response.data.message);
    } catch (e) {
      return null;
    }
  }
}

export default HTTPError;
