import { lazy } from "react";
import { AUTHPATH } from "./path";

const authRoutes = [
  {
    exact: true,
    path: AUTHPATH.LOGIN,
    component: lazy(() => import("../../../views/auth/Login")),
  },
  {
    exact: true,
    path: AUTHPATH.SIGNUP,
    component: lazy(() => import("../../../views/auth/Register")),
  },
  {
    exact: true,
    path: AUTHPATH.FORGETPWD,
    component: lazy(() => import("../../../views/auth/ForgetPassword")),
  },
  {
    path: AUTHPATH.RESETPWD,
    component: lazy(() => import("../../../views/auth/ResetPassword")),
  },
  {
    path: "*",
    component: lazy(() => import("../../../views/error/Error")),
  },
];

export default authRoutes;
