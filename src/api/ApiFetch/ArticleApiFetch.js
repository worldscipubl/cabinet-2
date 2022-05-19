import {BASE_URL} from '../../utils/constants'

class ArticleApiFetch {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _currentToken = '';

  set currentToken(value) {
    this._currentToken = value;
  }

  set test(value) {
    this._test = value;
    console.log(this._test)
  }

  handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  fileArchive(articleId, token) {
    return fetch(`${this._baseUrl}/article-files/article/${articleId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`
      },
    })
      .then((res) => this.handleResponse(res));
  }

  articleStatus(articleId, token, expand) {
    return fetch(`${this._baseUrl}/articles/${articleId}?expand=${expand}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`
      },
    })
      .then((res) => this.handleResponse(res));
  }

  articleChanges(articleId, token, stage, start, count) {
    return fetch(`${this._baseUrl}/article-changes?articleId=${articleId}&stage=${stage}&start=${start}&count=${count}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`
      },
    })
      .then((res) => this.handleResponse(res));
  }

  getArticles(token, offset, count) {
    return fetch(`${this._baseUrl}/articles?offset=${offset}&count=${count}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`
      },
    })
      .then((res) => {
        const allArticles = res.headers.get("X-Pagination-Total-Count")
        // const countPages = res.headers.get("X-Pagination-Page-Count");
        // const currentPage = res.headers.get("X-Pagination-Current-Page");
        // if(currentPage < countPages) {
        //   console.log(currentPage)
        //   nextPage = Number(currentPage) + 1
        //   console.log(nextPage)
        // }

        // const articlesHeader = {
        //   allArticles: res.headers.get("X-Pagination-Total-Count"),
        //   allPages: res.headers.get("X-Pagination-Page-Count"),
        //   currentPage: res.headers.get("X-Pagination-Current-Page"),
        //   articlesInPage: res.headers.get("X-Pagination-Per-Page"),
        //   nextPage: nextPage
        // }
        const data = res.json();
        return {
          data: Object(data),
          allArticles,
        };

      });
  }

}

const articleApiFetch = new ArticleApiFetch(BASE_URL, localStorage.getItem("user_token"));
export default articleApiFetch;
