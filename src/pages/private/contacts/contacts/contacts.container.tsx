import MainColumn from "src/ui/main-column/main-column.component";
import ContactsSideBar from "./contacts-sidebar.component";
import { Outlet } from "react-router-dom";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
const Contacts = () => {
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  const content = (
    <MainColumn>
      <ContactsSideBar />
      {/* Header */}
    </MainColumn>
  );
  if (!isMoBile) {
    return (
      <>
        {content}
        <Outlet />
      </>
    );
  }
  return isOpenTab ? <Outlet /> : content;
};
export default Contacts;
