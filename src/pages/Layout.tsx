import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import AnalyticsTracker from "../components/analytics/AnalyticsTracker";

const Layout = () => {
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
