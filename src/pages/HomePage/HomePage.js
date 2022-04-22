import React, {useState} from "react";
// import EmptyState from "../../domain/EmptyState";
import withMainLayout from "../../hoc/withMainLayout";
import styles from "./HomePage.module.scss"
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
import HomePageCardForm from "./HomePageCardForm";
import classNames from "classnames";

const HomePage = ({ ...props }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  function hahdlerModalOpen(data) {
    setIsModalOpen(data)
  }

  return (
    <div className={styles.content}>
      <p className={styles.content__text}>Бесплатный видеокурс “Академическое письмо — легко и просто"</p>

      <div className={styles.offer}>
        <img src={Homepage} alt="" className={styles.offer__teach}/>
        <div className={styles.offer__content}>
          <img src={Book} alt="" className={styles.offer__book}/>
          <h1 className={styles.offer__title}>Обучающий курс 1 модуль</h1>
          <h2 className={styles.offer__subtitle}>«Академическое письмо – легко и просто. Теория и практика»</h2>

          <div className={styles.offer__youtubeWrapper}>
            <img src={Youtube} alt="" className={styles.offer__youtube}/>
            <p className={styles.offer__text}>12 уроков доступно на YouTube</p>
          </div>

        </div>

      </div>

      <p className={styles.content__text}>Вдохновляйтесь историями успеха публикаций коллег</p>

      <div className={styles.history}>
        <ul className={styles.history__list}>
          <li className={styles.history__item}>
            <div className={styles.history__imgWrapper}>
              <img src={Zibeline} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>91-й процентиль</p>
          </li>
          <li className={styles.history__item}>
            <div className={styles.history__imgWrapper}>
              <img src={Elsevier} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q3</h3>
            <p className={styles.history__text}>42-й процентиль</p>
          </li>
          <li className={styles.history__item}>
            <div className={styles.history__imgWrapper}>
              <img src={Inder} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>78-й процентиль</p>
          </li>
          <li className={classNames(styles.history__item, styles.history__item_more)}
              onClick={() => setIsModalOpen(true)}>
            <p className={styles.history__moreText}>Показать все</p>
            <img src={Arrow} alt="" className={styles.history__moreArrow}/>
          </li>
        </ul>
      </div>

      <p className={styles.content__text}>Находите полезные материалы</p>

      <div className={styles.materials}>
        <ul className={styles.materials__list}>
          <li className={styles.materials__item}>
            <div className={styles.materials__imgWrapper}>
              <img src={Wsp1} alt="" className={styles.history__img}/>
            </div>
            <p className={styles.materials__text}>Чат-бот предоставит актуальную и полезную информацию</p>
          </li>
          <li className={classNames(styles.materials__item, styles.materials__item_blue)}>
            <div className={styles.materials__imgWrapper}>
              <img src={Pdf1} alt="" className={styles.history__img}/>
            </div>
            <p className={styles.materials__text}>Методические рекомендации по подготовке и написанию научных статей</p>
          </li>
          <li className={classNames(styles.materials__item, styles.materials__item_green)}>
            <div className={styles.materials__imgWrapper}>
              <img src={Pdf2} alt="" className={styles.history__img}/>
            </div>
            <p className={styles.materials__text}>Методические рекомендации по составлению списка литературы</p>
          </li>
          <li className={classNames(styles.materials__item, styles.materials__item_rose)}>
            <div className={styles.materials__imgWrapper}>
              <img src={Pdf3} alt="" className={styles.history__img}/>
            </div>
            <p className={styles.materials__text}>Методические рекомендации по выявлению журналов – «хищников»</p>
          </li>
        </ul>
      </div>

      <Modal open={isModalOpen}
             setOpen={hahdlerModalOpen}
             overlay={true}
             className={styles.form}
      >

       <HomePageCardForm onClose={hahdlerModalOpen}/>

      </Modal>

    </div>

  );
};

export default withMainLayout(HomePage, { title: "Главная" });
