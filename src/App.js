import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Components/Context/User";
import getUserRoutes from "./constant/routes";
import "./styles/style.css";

const router = createBrowserRouter(getUserRoutes());

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  );
}

export default App;
