import React from "react";
import "./ArticlePipeline.scss";
import ArticleSummary from "../../../components/ArticleSummary/ArticleSummary";
import ArticleStages from "../../../components/ArticleStages/ArticleStages";

const ArticlePipeline = ({ article }) => {
  return (
    <div className="article">
      <ArticleSummary article={article} />
      <ArticleStages article={article} />
    </div>
  );
};

export default ArticlePipeline;
