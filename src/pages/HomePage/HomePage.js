import React, {useState} from "react";
import EmptyState from "../../domain/EmptyState";
import withMainLayout from "../../hoc/withMainLayout";
import "./HomePage.scss";
import Homepage from '../../common/images/home-page/homepage.svg';
import Zibeline from '../../common/images/home-page/zibeline.svg';
import Elsevier from '../../common/images/home-page/elsevier.svg';
import Inder from '../../common/images/home-page/inder.svg';
import Arrow from '../../common/images/home-page/arrow.svg';
import Book from '../../common/images/home-page/book.svg';
import Youtube from '../../common/images/home-page/youtube.svg';
import Wsp1 from '../../common/images/home-page/wsp1.svg';
import Pdf1 from '../../common/images/home-page/pdf1.svg';
import Pdf2 from '../../common/images/home-page/pdf2.svg';
import Pdf3 from '../../common/images/home-page/pdf3.svg';

import Modal from "../../components/Modal/Modal";

const HomePage = ({ ...props }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  function hahdlerModalOpen(data) {
    setIsModalOpen(data)
  }

  return (
    <div className="content">
      <p className="content__text">Бесплатный видеокурс “Академическое письмо — легко и просто"</p>

      <div className="offer">
        <img src={Homepage} alt="" className="offer__teach"/>
        <div className="offer__content">
          <img src={Book} alt="" className="offer__book"/>
          <h1 className="offer__title">Обучающий курс 1 модуль</h1>
          <h2 className="offer__subtitle">«Академическое письмо – легко и просто. Теория и практика»</h2>

          <div className="offer__youtube-wrapper">
            <img src={Youtube} alt="" className="offer__youtube"/>
            <p className="offer__text">12 уроков доступно на YouTube</p>
          </div>

        </div>
        {/*<h1 className="offer__title">Обучающий курс 1 модуль</h1>*/}
        {/*<h2 className="offer__subtitle">«Академическое письмо – легко и просто. Теория и практика»</h2>*/}
        {/*<div className="offer__youtube">*/}
        {/*  /!*<img src={Youtube} alt="" className={styles.offer__youtubeLable}/>*!/*/}
        {/*  <p className="offer__text">12 уроков доступно на YouTube</p>*/}
        {/*</div>*/}
      </div>

      <p className="content__text">Вдохновляйтесь историями успеха публикаций коллег</p>

      <div className="history">
        <ul className="history__list">
          <li className="history__item">
            <div className="history__imgWrapper">
              <img src={Zibeline} alt="" className="history__img"/>
            </div>
            <h3 className="history__title">Scopus Q1</h3>
            <p className="history__text">91-й процентиль</p>
          </li>
          <li className="history__item">
            <div className="history__imgWrapper">
              <img src={Elsevier} alt="" className="history__img"/>
            </div>
            <h3 className="history__title">Scopus Q3</h3>
            <p className="history__text">42-й процентиль</p>
          </li>
          <li className="history__item">
            <div className="history__imgWrapper">
              <img src={Inder} alt="" className="history__img"/>
            </div>
            <h3 className="history__title">Scopus Q1</h3>
            <p className="history__text">78-й процентиль</p>
          </li>
          <li className="history__item history__item_more"
              onClick={() => setIsModalOpen(true)}>
            <p className="history__moreText">Показать все</p>
            <img src={Arrow} alt="" className="history__moreArrow"/>
          </li>
        </ul>
      </div>

      <p className="content__text">Находите полезные материалы</p>

      <div className="materials">
        <ul className="materials__list">
          <li className="materials__item">
            <div className="materials__imgWrapper">
              <img src={Wsp1} alt="" className="history__img"/>
            </div>
            <p className="materials__text">Чат-бот предоставит актуальную и полезную информацию</p>
          </li>
          <li className="materials__item materials__item_blue">
            <div className="materials__imgWrapper">
              <img src={Pdf1} alt="" className="history__img"/>
            </div>
            <p className="materials__text">Методические рекомендации по подготовке и написанию научных статей</p>
          </li>
          <li className="materials__item materials__item_green">
            <div className="materials__imgWrapper">
              <img src={Pdf2} alt="" className="history__img"/>
            </div>
            <p className="materials__text">Методические рекомендации по составлению списка литературы</p>
          </li>
          <li className="materials__item materials__item_rose">
            <div className="materials__imgWrapper">
              <img src={Pdf3} alt="" className="history__img"/>
            </div>
            <p className="materials__text">Методические рекомендации по выявлению журналов – «хищников»</p>
          </li>
        </ul>
      </div>

      <Modal open={isModalOpen}
             setOpen={hahdlerModalOpen}>
        <div>
          <p>123456</p>
        </div>
      </Modal>

    </div>
    
  );
};

export default withMainLayout(HomePage, { title: "Главная" });
