import React from "react";
import { useRouter } from "next/router";
import routPath from "src/routes/routes";
import { WSCard } from "src/component/common/card/WSCard";
import "./404.less";
import Router  from 'next/router';

export default function Custom404() {
  // const router = useRouter();
  return (
    <div className="page-not-found-container">
      <WSCard className="error-main-div">
        <div className="logo-title">
          <span>iResonate</span>
        </div>
        <div className="error-title">
          <span>ERROR</span>
        </div>
        <div className="title-404">404</div>
        <div className="page-not-found-title">Page Not Found</div>
        <div className="title-message">
          We`re sorry, the page you have requested is not found. Please go to
          the{" "}
          <span
            className="home-title"
            onClick={() => Router.push(routPath.rootRoute)}
          >
            Home
          </span>{" "}
          page and try again.
        </div>
      </WSCard>
    </div>
  );
}
