import React from "react";
import styles from './HomePageCardForm.module.scss'
import Zibeline from '../../../common/images/home-page/zibeline.svg'
import Elsevier from '../../../common/images/home-page/elsevier.svg'
import Inder from '../../../common/images/home-page/inder.svg'
import Emerald from '../../../common/images/home-page/emerald.svg'
import People from '../../../common/images/home-page/people.svg'
import Gr from '../../../common/images/home-page/gr.svg'
import inYan from '../../../common/images/home-page/in-yan.svg'
import classNames from "classnames";
import cn from "../../FaqPage/FaqSection/FaqSection.module.scss";

function HomePageCardForm({onClose}) {

  function openNewWin(url,)
  {
    window.open(url, "_blank");
  }

  return (
      <div className={styles.history}>
        <div className={styles.content__wrapper}>
          <p className={styles.content__text}>Вдохновляйтесь историями успеха публикаций коллег</p>
        </div>
        <ul className={styles.history__list}>
          <li onClick={() => openNewWin("https://t.me/Wosscopusbot?start=w16947782")}
             className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Zibeline} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>91-й процентиль</p>
          </li>
          <li onClick={() => openNewWin("https://t.me/Wosscopusbot?start=w16947769")}
             className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Elsevier} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q3</h3>
            <p className={styles.history__text}>42-й процентиль</p>
          </li>
          <li onClick={() => openNewWin("https://t.me/Wosscopusbot?start=w16951262")}
             className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Inder} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>78-й процентиль</p>
          </li>
          <li onClick={() => openNewWin("https://t.me/Wosscopusbot?start=w16947778")}
             className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Emerald} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q3</h3>
            <p className={styles.history__text}>42-й процентиль</p>
          </li>
          <li onClick={() => openNewWin("https://t.me/Wosscopusbot?start=w16974579")}
             className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Zibeline} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>78-й процентиль</p>
          </li>
          <li onClick={() => openNewWin("https://t.me/Wosscopusbot?start=w16608140")}
             className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={People} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q3</h3>
            <p className={styles.history__text}>42-й процентиль</p>
          </li>
          <li onClick={() => openNewWin("https://t.me/Wosscopusbot?start=w16974588")}
             className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Gr} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>78-й процентиль</p>
          </li>
          <li onClick={() => openNewWin("https://t.me/Wosscopusbot?start=w16913033")}
             className={classNames(styles.history__link, styles.history__link_light)}>
            <div className={styles.history__imgWrapper}>
              <img src={inYan} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q2</h3>
            <p className={styles.history__text}>59-й процентиль</p>
          </li>

        </ul>

        <button type="button"
                className={styles.form__close}
                onClick={() => onClose(false)}
        >&#215;</button>

      </div>

  )
}

export default HomePageCardForm;
