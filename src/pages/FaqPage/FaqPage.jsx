import React from "react";
import "./FaqPage.scss";
import Card from "../../components/Card";

const FaqPage = (props) => {
  return <Card appearance={{ type: "paper" }}>
    <p className="text text_align_left text_size_subtitle">
      FAQ
    </p>
    <p className="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus adipisci alias, aspernatur assumenda
      consequatur consequuntur dolore doloremque excepturi illum in laborum maxime nostrum numquam odit quas vero
      voluptatem voluptatibus.
    </p>
    <p className="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus adipisci alias, aspernatur assumenda
      consequatur consequuntur dolore doloremque excepturi illum in laborum maxime nostrum numquam odit quas vero
      voluptatem voluptatibus.
    </p>
    <p className="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus adipisci alias, aspernatur assumenda
      consequatur consequuntur dolore doloremque excepturi illum in laborum maxime nostrum numquam odit quas vero
      voluptatem voluptatibus.
    </p>
  </Card>;
};

export default FaqPage;
