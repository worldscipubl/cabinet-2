import React from "react";
import Card from "../../../../components/Card";
import promoCodeImg from "../../../../common/images/illustrations/promocode.svg";
import FieldBuilder from "../../../../components/FieldBuilder";
import "./LinkTab.scss";

const LinkTab = () => {
    // TODO: Подставить userId из контекста (стора)
    const referralLink = `${window.location.origin}/partner/${'userId'}`;

    const handleClipboard = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(referralLink);
    };

    return (
        <div>
            <Card className="link-tab" appearance={{type: "paper"}}>
                <div className="link-tab__inner">
                    <p className="text text_size_accent link-tab__subtitle text_align_center">
                        Мы создали продукт который не стыдно рекомендовать коллегам. <br/>
                        Каждый профиль в личном кабинете World Sci Publ <br/>
                        автоматически участвует в партнерской программе.
                    </p>
                    <p className="text text_size_accent link-tab__subtitle text_align_center">
                        За приглашенных авторов мы готовы выплачивать 75$
                    </p>

                    <img className="link-tab__img" src={promoCodeImg} alt="/"/>
                    <p className="link-tab__img-label text text_size_accent text_align_center">
                        Выплата происходит сразу если по вашей реферальной ссылке автор зарегистрировался в личном
                        кабинете и
                        оплатил
                        услуги сервиса.
                    </p>

                    <div className="link-tab__clipboard clipboard">
                        <h4 className="clipboard__title text text_size_accent text_weight_bold">
                            Реферальрная ссылка для коллег:
                        </h4>
                        <div className="clipboard__form">
                            <div className="clipboard__field">
                                <FieldBuilder readOnly defaultValue={referralLink}/>
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
