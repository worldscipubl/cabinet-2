import React from "react";
import Card from "../../../../components/Card";
import promoCodeImg from "../../../../common/images/illustrations/promocode.svg";
import FieldBuilder from "../../../../components/FieldBuilder";
import "./LinkTab.scss";

const LinkTab = () => {
  return (
    <Card className="link-tab" appearance={{ type: "paper" }}>
      <h3 className="link-tab__title text text_size_subtitle text_weight_bold text_align_center">
        Программа лояльности
      </h3>
      <p className="text link-tab__subtitle text_size_default text_align_center">
        Мы создали продукт который не стыдно рекомендовать коллегам.
        Каждый профиль в личном кабинете World Sci Publ автоматически участвует
        в партнерской программе. За приглашенных авторов мы готовы выплачивать 75$
      </p>

      <img className="link-tab__img" src={promoCodeImg} alt="/" />
      <p className="link-tab__img-label text text_size_default text_align_center">
        Мы создали продукт который не стыдно рекомендовать коллегам.
        Каждый профиль в личном кабинете World Sci Publ автоматически участвует
        в партнерской программе. За приглашенных авторов мы готовы выплачивать 75$
      </p>

      <div className="link-tab__clipboard">
        <div className="clipboard__field">
          <FieldBuilder label="Реферальрная ссылка для коллег:" />
        </div>
        <button className="clipboard__btn button button_type_main">
          Скопировать
        </button>
      </div>
    </Card>
  );
};

export default LinkTab;
