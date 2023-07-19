import Layout from "../Components/Layout";
import FormDesigner from "../Components/FormDesigner";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
import FormPage from "../Components/Form";
import AuthChecker from "../Components/AuthChecker";

const allRoutes = [
  {
    path: "/",
    element: (
      <AuthChecker>
        <Login />
      </AuthChecker>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <AuthChecker>
        <Layout title="Dashboard">
          <Dashboard />
        </Layout>
      </AuthChecker>
    ),
  },
  {
    path: "/form-designer",
    element: (
      <AuthChecker>
        <Layout title="Form Designer Page">
          <FormDesigner />
        </Layout>
      </AuthChecker>
    ),
  },
  {
    path: "/form",
    element: (
      <AuthChecker>
        <Layout title="Actual Form">
          <FormPage />
        </Layout>
      </AuthChecker>
    ),
  },
];

const getUserRoutes = (role = "") => {
  if (!role) return allRoutes;
  return allRoutes.filter((route) => {
    return route?.role.includes(role);
  });
};

export default getUserRoutes;
