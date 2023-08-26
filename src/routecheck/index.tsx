import React, { useEffect } from "react";
import { Roles } from "src/typeGeneratedAdmin";
import { UserRoleType } from "src/types";
import { getCurrentUser } from "../utils/helper";
import Router from "next/router";
import routPath from "src/routes/routes";

export function withAuth(Component, Role) {
  const Restriction = (props) => {
    useEffect(() => {
      isUserCheck();
    }, [props]);

    const currentUser = getCurrentUser();

    const isUserCheck = () => {
      if (Role === UserRoleType.ContentWriter) {
        if (!(currentUser?.role === Roles.ContentWriter)) {
          return Router.push(routPath.contentProviderLogin);
        }
      }
      if (Role === UserRoleType.Member) {
        if (!(currentUser?.role === Roles.Enduser)) {
          return Router.push(routPath.donorLogin);
        }
      }
      if (Role === UserRoleType.Admin) {
        if (!(currentUser?.role === Roles.Admin)) {
          return Router.push(routPath.adminLogin);
        }
      }
      if (Role === UserRoleType.Vendor) {
        if (!(currentUser?.role === Roles.Vendor)) {
          return Router.push(routPath.webHostLogin);
        }
      }
    };
    return <Component {...props} />;
  };

  return Restriction;
}
