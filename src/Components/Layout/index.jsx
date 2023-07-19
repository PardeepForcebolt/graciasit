import { useAuth } from "../Context/User";

const Layout = ({ children, title = "" }) => {

  const {signout} = useAuth()
  return (
    <div className="border m-1">
      <div className="h-14 p-2 border-b-2 flex items-center justify-between">
        <h4>{title}</h4>

        <button className="p-2 border" onClick={signout}>SignOut</button>
      </div>
      {children}
    </div>
  );
};

export default Layout;
