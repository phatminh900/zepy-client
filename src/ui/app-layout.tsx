import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/sidebar.component";

const AppLayout = () => {
  return (
    <main className="grid grid-cols-[60px_1fr] fixed w-screen sm:text-sm md:text-base  inset-0 h-[100dvh] md:grid-cols-[70px_360px_1fr] overflow-hidden">
      <SideBar />
      <Outlet />
    </main>
  );
};
export default AppLayout;
