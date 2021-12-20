import React from "react";
import Card from "../../../../components/Card";
import promoCodeImg from "../../../../common/images/illustrations/promocode.svg";
import FieldBuilder from "../../../../components/FieldBuilder";
import "./LinkTab.scss";

const LinkTab = () => {
  const referralLink = "referral-link";
  const handleClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div>
      <Card className="link-tab" appearance={{ type: "paper" }}>
        <div className="link-tab__inner">
          <h3 className="link-tab__title text text_size_subtitle text_weight_bold text_align_center">
            Программа лояльности
          </h3>
          <p className="text link-tab__subtitle text_align_center">
            Мы создали продукт который не стыдно рекомендовать коллегам.
            Каждый профиль в личном кабинете World Sci Publ автоматически участвует
            в партнерской программе. За приглашенных авторов мы готовы выплачивать 75$
          </p>

          <img className="link-tab__img" src={promoCodeImg} alt="/" />
          <p className="link-tab__img-label text text_align_center">
            Выплата происходит сразу если по вашей реферальной ссылке автор зарегистрировался в личном кабинете и
            оплатил
            услуги сервиса.
          </p>

          <div className="link-tab__clipboard clipboard">
            <p className="clipboard__title text">Реферальрная ссылка для коллег:</p>
            <div className="clipboard__form">
              <div className="clipboard__field">
                <FieldBuilder readOnly defaultValue={referralLink} />
              </div>
              <button className="clipboard__btn button button_type_main" onClick={handleClipboard}>
                Скопировать
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LinkTab;
