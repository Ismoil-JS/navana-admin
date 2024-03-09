import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import c from "./Dashboard.module.scss"

const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/dashboard") {
      navigate("/dashboard/car")
    }
  }, [navigate, pathname]);

  return (
    <div className={c.dashboard}>
      <div className={c.navbar}>
        <h1 className={c.dashboard__title}>Dashboard</h1>
        <nav className={c.navbar__nav}>
          <NavLink
            className={c.navbar__link}
            to="/dashboard/car"
          >
            Cars
          </NavLink>
          <NavLink
            className={c.navbar__link}
            to="/dashboard/news"
          >
            News
          </NavLink>
        </nav>
      </div>
      <div className={c.body}>
        <Outlet />
      </div>

    </div>

  )
}

export default Dashboard;
