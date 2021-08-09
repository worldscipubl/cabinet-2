import ApiService from "./ApiService";

class ArticlesService extends ApiService {
  getArticles = () => {
    return new Promise((resolve, reject) => {
      this.getResource({
        url: `/articles`,
        auth: { username: "rayec89552@aline9.com", password: "DzeG3Jx@}G$p" },
      })
        .then((response) => {
          if (response.data) resolve(response.data);
          else reject(new Error("No data"));
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  getArticleById = (id) => {
    return new Promise((resolve, reject) => {
      this.getResource({
        url: `/articles/${id}`,
      })
        .then((response) => {
          reject(response);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  getArticleStatusById = (id) => {
    return new Promise((resolve, reject) => {
      this.getResource({
        url: `/articles/${id}/statuses`,
      })
        .then((response) => {
          reject(response);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
}

export default ArticlesService;
