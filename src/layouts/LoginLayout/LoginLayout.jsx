import React from "react";
import "./LoginLayout.scss";
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from "../../components/Card/Card";
import { LogoBanner } from "../../components/LogoBanner/LogoBanner";
import Copyright from "../../components/Copyright/Copyright";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

export const LoginLayout = ({ children }) => {
  return (
    <div className="page-spread">
      <div className="page-spread__paper">
        <Card type="paper" isUnion isClient>
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
