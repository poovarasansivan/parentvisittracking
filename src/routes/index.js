import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Forms = lazy(() => import('../pages/Forms'));
const Cards = lazy(() => import('../pages/Cards'));
const Charts = lazy(() => import('../pages/Charts'));
const Buttons = lazy(() => import('../pages/Buttons'));
const Modals = lazy(() => import('../pages/Modals'));
const Tables = lazy(() => import('../pages/Tables'));
const Page404 = lazy(() => import('../pages/404'));
const Blank = lazy(() => import('../pages/Blank'));
const AdminHome = lazy(() => import('../pages/admin/Home'));
const ManageUsers = lazy(() => import('../pages/admin/ManageUser'));
const AddNewUsers = lazy(() => import('../pages/admin/AddNewUser'));
const ManageVisitRequest = lazy(() => import('../pages/admin/ManageRequest'));
const AddNewVisitRequest = lazy(() => import('../pages/admin/AddNewRequest'));
const FacultyHome = lazy(() => import('../pages/faculty/home'));
const ParentHome = lazy(() => import('../pages/parent/ParentHome'));
const SecurityHome = lazy(() => import('../pages/parent/SecurityHome'));
const ManageUnauthRequest = lazy(() => import('../pages/security/Unauthentry'));
const NewUnscheduledEntry = lazy(() => import('../pages/security/NewUnAuthEntry'));

const routes = [
  {
   path:"/new-unscheduled-entry",
    component:NewUnscheduledEntry,
  },
  {
    path: "/manage-unauth-entry",
    component: ManageUnauthRequest,
  },
  {
    path: "/security-home",
    component: SecurityHome,
  },
  {
    path: "/parent-home",
    component: ParentHome,
  },
  {
    path: "/faculty-home",
    component: FacultyHome,
  },
  {
    path: "/add-new-request",
    component: AddNewVisitRequest,
  },
  {
    path: "/manage-visit-request",
    component: ManageVisitRequest,
  },
  {
    path: "/manage-users",
    component: ManageUsers,
  },
  {
    path: "/add-users",
    component: AddNewUsers,
  },
  {
    path: "/admin-home",
    component: AdminHome,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/forms",
    component: Forms,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/modals",
    component: Modals,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
