import React from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import EmptyState from "../../domain/EmptyState";
import Spinner from "../../components/Spinner";
import withMainLayout from "../../hoc/withMainLayout";
import { useGetFaqListQuery } from "../../api/endpoints/FaqApi";
import cn from "./FaqPage.module.scss";
import FaqSection from "./FaqSection";

const FaqPage = (props) => {
  const { data, error, isLoading } = useGetFaqListQuery();
  const history = useHistory();

  if (isLoading) return <Spinner />;

  if (error) return (
    <EmptyState
      type="warning"
      title="Упс... Произошла ошибка!"
      description={error}>
      <button className="button button_type_main" onClick={() => history.push("/")}>
        Вернуться на главную
      </button>
    </EmptyState>
  );

  if (!data?.length) return (
    <EmptyState
      title="Часто задаваемые вопросы"
      description="Список пока что пуст" />
  );

  return (
    <div className={classNames(cn.Wrapper)}>
      {
        data.map(({ id, name, items }) => (
          <FaqSection key={id} name={name} items={items} />)
        )
      }
    </div>
  );
};

export default withMainLayout(FaqPage, { title: "FAQ" });
