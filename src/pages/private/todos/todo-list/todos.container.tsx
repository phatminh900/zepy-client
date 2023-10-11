import { Outlet } from "react-router-dom";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import MainColumn from "src/ui/main-column/main-column.component";
import TodosSideBar from "./todos-sidebar/todo-lists.compoent";

const Todos = () => {
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  const content = (
    <MainColumn>
      <TodosSideBar />
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
export default Todos;
