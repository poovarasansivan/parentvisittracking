const roles = localStorage.getItem("role");

let routes = [];

switch (roles) {
  case "1":
    routes = [
      {
        path: "/app/admin-home",
        icon: "HomeIcon",
        name: "Home Page",
      },
      {
        path: "/app/manage-users",
        icon: "CiUser",
        name: "Manage Users",
      },
      {
        path: "/app/manage-visit-request",
        icon: "CiSquareQuestion",
        name: "Manage Visit Request",
      },
      {
        path: "/app/manage-unauth-entry",
        icon: "CiSquareQuestion",
        name: "Unauthorized Entry",
      },
    ];
    break;

  case "2":
    routes = [
      {
        path: "/app/faculty-home",
        icon: "HomeIcon",
        name: "Faculty Home",
      },
      {
        path: "/app/manage-visit-request",
        icon: "CiSquareQuestion",
        name: "Manage Visit Request",
      },
      {
        path: "/app/manage-unauth-entry",
        icon: "CiSquareQuestion",
        name: "Unauthorized Entry",
      },
    ];
    break;
  case "3":
    routes = [
      {
        path: "/app/parent-home",
        icon: "HomeIcon",
        name: "Parent Home",
      },
      {
        path: "/app/manage-visit-request",
        icon: "CiSquareQuestion",
        name: "Manage Visit Request",
      },
      {
        path: "/app/manage-unauth-entry",
        icon: "CiSquareQuestion",
        name: "Unauthorized Entry",
      },
    ];
    break;
  case "4":
    routes = [
      {
        path: "/app/security-home",
        icon: "HomeIcon",
        name: "Security Home",
      },
      {
        path: "/app/manage-visit-request",
        icon: "CiSquareQuestion",
        name: "Manage Visit Request",
      },
      {
        path: "/app/manage-unauth-entry",
        icon: "CiSquareQuestion",
        name: "Unauthorized Entry",
      },
    ];
    break;
  default:
    routes = [
      {
        path: "/login",
        icon: "LoginIcon",
        name: "Login",
      },
    ];
}

export default routes;
