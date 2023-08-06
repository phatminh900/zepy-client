import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";

const MainColumnInputWrapper = ({ children }: Children) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full"
      onClick={() =>
        navigate({
          pathname: ROUTES.SEARCH,
          search: "",
        })
      }
    >
      {/* Children === search input */}
      {children}
    </div>
  );
};
export default MainColumnInputWrapper;
