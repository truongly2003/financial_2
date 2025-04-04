import routes from "@configs/routes";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
import ProfileLayout from "@/layouts/ProfileLayout";
// client
import Transaction from "@client/Transaction";
import Overview from "@client/Overview";
import Catalog from "@client/Catalog";
import Budget from "@client/Budget";

import Goal from "@/pages/client/Goal";
// authentication
import Login from "@client/Authentication/Login";
import SignUp from "@client/Authentication/SignUp";
import Profile from "@/pages/client/Profile";
import WalletPage from "@/pages/client/WalletPage";
import BudgetDetail from "@/pages/client/BudgetDetail";
import GoalDetail from "@/pages/client/GoalDetail";
// import LoginPage from "@/pages/client/Authentication/LoginPage";
import AuthCallback from "@/pages/client/Authentication/AuthCallback";
// import HomePage from "@/pages/client/Authentication/HomePage";
// import RedirectPage from "@/pages/client/Authentication/RedirectPage";
import Home from "@/pages/client/Home";
import TransactionLayout from "@/layouts/TransactionLayout";
export const publicRoutes = [
  { path: routes.Home, component: Home,layout: DefaultLayout }, 
  { path: routes.Transaction, component: Transaction, layout: TransactionLayout }, 
  { path: routes.Login, component: Login, layout: null },
  { path: routes.SignUp, component: SignUp, layout: null },
  // { path: routes.LoginPage, component: LoginPage, layout: null },
  { path: routes.Auth, component: AuthCallback, layout: null },
  // { path: routes.HomePage, component: HomePage, layout: null },
  // { path: routes.Redirect, component: RedirectPage, layout: null },
];

// Private Routes (cần đăng nhập)
export const privateRoutes = [
  // { path: routes.Transaction, component: Transaction, layout: DefaultLayout },
  { path: routes.Overview, component: Overview, layout: TransactionLayout },
  { path: routes.Catalog, component: Catalog, layout: ProfileLayout },
  { path: routes.Budget, component: Budget, layout: TransactionLayout },
  { path: routes.BudgetDetail, component: BudgetDetail, layout: TransactionLayout },
  { path: routes.Goal, component: Goal, layout: TransactionLayout },
  { path: routes.GoalDetail, component: GoalDetail, layout: TransactionLayout },
  { path: routes.Profile, component: Profile, layout: ProfileLayout },
  { path: routes.Wallet, component: WalletPage, layout: ProfileLayout },
];

