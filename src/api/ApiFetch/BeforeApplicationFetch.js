import {BASE_URL} from '../../utils/constants'

class BeforeApplicationFetch {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  f

  handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  // Получить заявки текущего пользователя
  getBeforeApplications(token)
  {
    return fetch(`${this._baseUrl}/before-article`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`
      },
    })
      .then((res) => this.handleResponse(res));
  }


  // articleStatus(articleId, token, expand) {
  //   return fetch(`${this._baseUrl}/articles/${articleId}?expand=${expand}`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Basic ${token}`
  //     },
  //   })
  //     .then((res) => this.handleResponse(res));
  // }
  //
  // articleChanges(articleId, token, stage, start, count) {
  //   return fetch(`${this._baseUrl}/article-changes?articleId=${articleId}&stage=${stage}&start=${start}&count=${count}`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Basic ${token}`
  //     },
  //   })
  //     .then((res) => this.handleResponse(res));
  // }
  //
  // getArticlesInProcess(token) {
  //   return fetch(`${this._baseUrl}/articles/in-process`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Basic ${token}`
  //     },
  //   })
  //     .then((res) => this.handleResponse(res));
  // }
  //
  //
  // getArticles(token, offset, count) {
  //   return fetch(`${this._baseUrl}/articles?offset=${offset}&count=${count}`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Basic ${token}`
  //     },
  //   })
  //     .then((res) => {
  //       const allArticles = res.headers.get("X-Pagination-Total-Count")
  //       const data = res.json();
  //       return {
  //         data: Object(data),
  //         allArticles,
  //       };
  //
  //     });
  // }

}

const beforeApplicationFetch = new BeforeApplicationFetch(BASE_URL, localStorage.getItem("user_token"));
export default beforeApplicationFetch;
