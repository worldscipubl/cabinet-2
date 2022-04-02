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
        params: { expand: "articleUploaded,currentStage,currentStatus" },
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
        responseType: "blob",
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

  setArticleBriefArticle = (data) => {
    return new Promise((resolve, reject) => {
      this.setResource({
        url: "/brief/article",
        data,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  setArticleBriefContact = (data) => {
    return new Promise((resolve, reject) => {
      this.setResource({
        url: "/users/self",
        data,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  setArticleBriefAuthors = (data) => {
    return new Promise((resolve, reject) => {
      this.setResource({
        url: "/reg-forms",
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

  uploadFile = (data) => {
    return new Promise((resolve, reject) => {
      this.setResource({
        url: "/article-files",
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

export const articlesService = new ArticlesService();
export default ArticlesService;
