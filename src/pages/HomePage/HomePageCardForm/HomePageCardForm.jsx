import React from "react";
import styles from './HomePageCardForm.module.scss'
import Zibeline from '../../../common/images/home-page/zibeline.svg'
import Elsevier from '../../../common/images/home-page/elsevier.svg'
import Inder from '../../../common/images/home-page/inder.svg'
import Emerald from '../../../common/images/home-page/emerald.svg'
import People from '../../../common/images/home-page/people.svg'
import Gr from '../../../common/images/home-page/gr.svg'

function HomePageCardForm({onClose}) {

  return (
      <div className={styles.history}>
        <p className={styles.content__text}>Вдохновляйтесь историями успеха публикаций коллег</p>
        <div className={styles.history__list}>
          <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Zibeline} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>91-й процентиль</p>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Elsevier} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q3</h3>
            <p className={styles.history__text}>42-й процентиль</p>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Inder} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>78-й процентиль</p>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Emerald} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q3</h3>
            <p className={styles.history__text}>42-й процентиль</p>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Zibeline} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>78-й процентиль</p>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={People} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q3</h3>
            <p className={styles.history__text}>42-й процентиль</p>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.history__link}>
            <div className={styles.history__imgWrapper}>
              <img src={Gr} alt="" className={styles.history__img}/>
            </div>
            <h3 className={styles.history__title}>Scopus Q1</h3>
            <p className={styles.history__text}>78-й процентиль</p>
          </a>
        </div>

        <button type="button"
                className={styles.form__close}
                onClick={() => onClose(false)}
        >&#215;</button>

      </div>

  )
}

export default HomePageCardForm;
