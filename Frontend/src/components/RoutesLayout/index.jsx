import { Outlet, useNavigate } from "react-router-dom";
import { memo, useEffect } from "react";
import Navbar from "../Navbar";
import { checkAuth, logout } from "../../hooks/checkAuth";


const index = memo(() => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
      if (!checkAuth()) {
        logout(navigate);
      }
  }, [])

  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
});

export default index;
