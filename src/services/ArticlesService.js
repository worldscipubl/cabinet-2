import ApiService from "./ApiService";

class ArticlesService extends ApiService {
  getArticles = () => {
    return new Promise((resolve, reject) => {
      this.getResource({
        url: `/articles`,
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
        params: { expand: "currentStage,currentStatus" },
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
  getArticleFileById = (id) => {
    return new Promise((resolve, reject) => {
      this.getResource({
        url: `/article-files/${id}`,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  getArticleChanges = (articleId, stage, start, count) => {
    return new Promise((resolve, reject) => {
      this.getResource({
        url: "/article-changes",
        params: { articleId, stage, start, count },
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

  uploadFile = (data) => {
    return new Promise((resolve, reject) => {
      this.setResource({
        url: "/article-files/add",
        data,
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

// const articlesService = new ArticlesService();
// export default ArticlesService;
export default ArticlesService;
