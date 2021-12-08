import ApiService from "./ApiService";

class UserService extends ApiService {
  signUp = (fields) => {
    return new Promise((resolve, reject) => {
      const { name, email } = fields;
      if (!name || !email) {
        reject(new Error("Нет email или пароля"));
        return;
      }

      //TODO: добавить проверку, чтобы объект fields соотвествовал схеме
      // name - string Имя (фио, фи, и) клиента
      // email - string Email клиента
      // phone - string Телефон клиента
      // coupon - string Скидочный купон
      // partnerId - int ID партнера
      // cookie - string Данные метрик в формате JSON (хранятся в куках у клиента)

      this.setResource({
        url: "/users/registration",
        data: fields
      })
        .then((response) => {
          if (response.status === 204) {
            this.logMessage("Login successful", response.data);
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  signIn = (fields) => {
    return new Promise((resolve, reject) => {
      const { email, password } = fields;
      if (!email || !password) {
        reject(new Error("Нет email или пароля"));
        return;
      }

      this.setResource({
        url: "/users/login",
        auth: { username: email, password }
      })
        .then((response) => {
          if (response.status === 200) {
            this.logMessage("Login successful", response.data);
            // index user details and basic auth credentials in local storage
            // to keep user logged in between page refreshes
            response.authdata = window.btoa(email + ":" + password);
            localStorage.setItem("user", JSON.stringify(response));
          }
        })
        .catch((error) => {
          this.handleUnauthorized(error.status);
          reject(error);
        });
    });
  };

  handleUnauthorized(statusCode) {
    if (statusCode === 401) {
      // auto logout if 401 response returned from entryApi
      if (localStorage.getItem("user")) {
        // remove user from local storage to log user out
        localStorage.removeItem("user");
        // window.location.reload(true);
      }
    }
  }
}

export default UserService;
