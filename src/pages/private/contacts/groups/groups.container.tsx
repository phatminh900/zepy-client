import { useTranslation } from "react-i18next";
import { HiOutlineUserGroup } from "react-icons/hi";
import ReturnButtonTitle from "src/components/return-button-title";
import RowHeader from "src/ui/row-header/row-header.component";
import GroupActions from "./group-actions.component";
import { useGetGroups } from "src/features/groups/groups.hook";
import Loader from "src/ui/Loader";
import GroupList from "./group-list.component";

const Groups = () => {
  const { t } = useTranslation("contact");
  const { isGettingGroups, groups } = useGetGroups();

  if (isGettingGroups) return <Loader />;
  return (
    <div>
      <RowHeader className="border-b border-b-[var(--color-grey-400)]">
        <ReturnButtonTitle>
          <div className="flex gap-1.5 items-center">
            <span className="text-2xl">
              <HiOutlineUserGroup />
            </span>
            <p>{t("groups.joinedGroup")}</p>
          </div>
        </ReturnButtonTitle>
      </RowHeader>
      <div className="pt-4 px-4">
        <p className="mb-3">
          {t("groups.groups")} ({groups?.length})
        </p>

        {/* actions */}

        <GroupActions />
        {/* List */}
        <div className="mt-3 overflow-y-scroll">
          {!groups?.length ? (
            <p className="text-center">{t("groups.emptyGroups")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              <GroupList groups={groups} />
              {/* {groups.map(({ group, count }) => (
                <GroupItem
                  avatar={group.avatar}
                  key={group.id}
                  count={count}
                  name={group.name}
                  id={group.id}
                />
              ))} */}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Groups;
