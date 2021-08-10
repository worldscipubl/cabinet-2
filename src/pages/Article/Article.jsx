import React from "react";
import { useParams } from "react-router-dom";
import Card, { CardHeader } from "../../components/Card/Card";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const Article = () => {
  const { id } = useParams();
  return (
    <div>
      <Card type="paper">
        <CardHeader>
          <h2 className="text text_size_accent">Название статьи</h2>
          <h3 className="text text_size_accent">Scopus / Q2</h3>
          <ProgressBar progress={42 || 0} />
        </CardHeader>
      </Card>
    </div>
  );
};

export default Article;
