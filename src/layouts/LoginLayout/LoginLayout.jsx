import React from "react";
import "./LoginLayout.scss";
import { LogoBanner } from "../../components/LogoBanner/LogoBanner";
import Copyright from "../../components/Copyright/Copyright";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import Card from "../../components/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

export const LoginLayout = ({ children }) => {
  return (
    <div className="page-spread">
      <div className="page-spread__paper">
        <Card appearance={{ type: "paper" }} isUnion isClient>
          <CardHeader>
            <h3 className="text">
              Личный кабинет <br />
              World Sci Publ
            </h3>
          </CardHeader>
          <CardBody>{children}</CardBody>
          <CardFooter>
            <PrivacyPolicy />
          </CardFooter>
        </Card>
      </div>
      <div className="page-spread__space">
        <Card>
          <CardBody>
            <LogoBanner />
          </CardBody>
          <CardFooter>
            <Copyright />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
