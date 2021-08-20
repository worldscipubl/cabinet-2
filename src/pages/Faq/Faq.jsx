import React from "react";
import "./Faq.scss";
import Tabs from "../../layouts/Tabs/Tabs";

export const Faq = (props) => {
  return (
    <Tabs>
      <div label="Gator">
        See ya later, <em>Alligator</em>!
      </div>
      <div label="Croc">
        After 'while, <em>Crocodile</em>!
      </div>
      <div label="Sarcosuchus">
        Nothing to see here, this tab is <em>extinct</em>!
      </div>
    </Tabs>
  );
};
