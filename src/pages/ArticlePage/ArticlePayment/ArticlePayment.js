import React from "react";
import Card from "../../../components/Card/Card";
import Loader from "../../../components/Loader";
import {
  useAlreadyPayMutation,
  useGetPaymentsQuery,
  usePaymentByLinkMutation,
  usePaymentByPdfMutation,
} from "../../../api/endpoints/ArticlePaymentApi";
import "./ArticlePayment.scss";

const ArticlePayment = ({ articleId = "" }) => {
  const { data, error, isLoading } = useGetPaymentsQuery(articleId);
  const [paymentByLink, {}] = usePaymentByLinkMutation();
  const [paymentByPdf, {}] = usePaymentByPdfMutation();
  const [alreadyPay, {}] = useAlreadyPayMutation();

  const paymentStatuses = {
    CONFIRMED: "Оплачено",
    NEW: "Новый платеж",
    CANCEL: "Отменено",
    MODERATION: "Идет проверка",
  };

  const handleByLink = async (method) => {
    if (!method) return;
    const data = { articleId, paymentMethod: method };
    console.log(data);
    await paymentByLink(data)
      .unwrap()
      .then((response) => {
        if (!response?.data) return;
        const { url } = response.data;
        window.open(url, "_blank").focus();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const handleByPdf = async (method) => {
    if (!method) return;
    const data = { articleId, paymentMethod: method };
    await paymentByPdf(data)
      .unwrap()
      .then((response) => {
        if (!response?.data) return;
        const { url } = response.data;
        window.open(url, "_blank").focus();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const handleAlreadyPay = async (method) => {
    if (!method) return;
    const data = { articleId, paymentMethod: method };
    await alreadyPay(data)
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const ArticlePaymentActions = ({ status = "", method }) => {
    if (String(status) === "CONFIRMED") return null;

    return (
      <div className="article-payment-card__col">
        <button
          className="article-payment-card__row button button_type_main active"
          onClick={() => handleByLink(method)}
        >
          Оплатить картой
        </button>
        <button
          className="article-payment-card__row button button_type_main active"
          onClick={() => handleByPdf(method)}
        >
          Оплатить по реквизитам
        </button>
        <button
          className="article-payment-card__row button button_type_main"
          onClick={() => handleAlreadyPay(method)}
        >
          Я уже оплатил
        </button>
      </div>
    );
  };

  if (isLoading) return <Loader />;
  if (error)
    return <h2 className="text text_align_center text_color_red">{error}</h2>;
  return (
    <div>
      {data.map(({ amount, currency, name, paymentMethod, paymentStatus }) => (
        <Card
          className="article-payment__item"
          appearance={{ type: "paper" }}
          key={name + paymentStatus}
        >
          <div className="article-payment-card">
            <div className="article-payment-card__col">
              <h3 className="text text_size_subtitle text_weight_bold">
                {name} <br />
                <span className="text_color_red text_size_accent">
                  {paymentStatuses[paymentStatus]}
                </span>
              </h3>
              <p className="article-payment-card__price text text_size_extra-title text_weight_bold">
                {amount} <span>{currency}</span>
              </p>
            </div>
            <ArticlePaymentActions
              status={paymentStatus}
              method={paymentMethod}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ArticlePayment;
