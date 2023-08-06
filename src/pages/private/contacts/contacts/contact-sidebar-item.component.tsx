import { NavLink } from "react-router-dom";
import SmallNotification from "src/components/small-notification";
import { PARAMS } from "src/constants/seachParams.constant";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";

const ContactSideBarItem = ({
  path,
  pathname,
  icon,
  label,
  notificationQuantity,
}: {
  path: string;
  pathname: string;
  icon: React.ReactNode;
  label: string;
  notificationQuantity?: number;
}) => {
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  return (
    <li className="relative" key={path}>
      <NavLink
        to={{
          pathname: path,
          search: isMoBile
            ? `?${PARAMS.isOpenTab}=${isMoBile && !isOpenTab ? "1" : "0"}`
            : "",
        }}
        state={{ prevLink: pathname + "/" + path }}
        className="py-[var(--gutter-left-component)] pl-[var(--gutter-left-component)] w-full font-semibold h-full  flex gap-3.5"
      >
        <span className=" text-xl">{icon}</span>
        <span>{label}</span>
        {notificationQuantity ? (
          <SmallNotification
            className="top-0 right-0 absolute"
            quantity={notificationQuantity}
          />
        ) : null}
      </NavLink>
    </li>
  );
};
export default ContactSideBarItem;
