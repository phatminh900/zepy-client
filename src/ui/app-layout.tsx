import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/sidebar.component";

const AppLayout = () => {
  return (
    <main className="grid grid-cols-[70px_1fr]  h-screen md:grid-cols-[70px_360px_1fr] overflow-hidden">
      <SideBar />
      <Outlet />
    </main>
  );
};
export default AppLayout;
