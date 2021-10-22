import ApiService from "./ApiService";

class UserFilesService extends ApiService {
  addFiles = (data) => {
    return new Promise((resolve, reject) => {
      this.setResource({
        url: "/user-files/add",
        data
      })
        .then((response) => {
          response(response);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
}

export const userFilesService = new UserFilesService();
export default userFilesService;
