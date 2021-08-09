import React from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  return (
    <article>
      <header>
        <h2 className="text text_size_subtitle text_weight_bold text_color_gray-blue">
          Статья №{id}
        </h2>
        <p>
          В данном разделе Вы можете отслеживать прогресс подготовки и
          продвижение вашей научной статьи
        </p>
      </header>
      <div className="articles"></div>
    </article>
  );
};

export default Article;
