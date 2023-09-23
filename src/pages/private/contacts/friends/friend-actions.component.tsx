import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSort } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import Select from "src/components/select";
import { PARAMS } from "src/constants/searchParams.constant";
import useSetSearchParams from "src/hooks/useSetSearchParams";

const FriendActions = () => {
  const { t } = useTranslation("contact");
  const { handleSetSearchParams } = useSetSearchParams();
  const [search, setSearch] = useState("");
  const handleChangeParams = (value: string) => {
    handleSetSearchParams(PARAMS.name, value);
  };
  const handleSearch = (value: string) => {
    setSearch(value);
    setSearch((cur) => {
      handleSetSearchParams(PARAMS.friendName, cur);
      return cur;
    });
  };
  return (
    <div className="grid grid-cols-2 items-center gap-2">
      <form className="flex  items-center col-span-2 bg-[var(--color-grey-100)]  md:col-span-1 border border-[var(--color-grey-400)] gap-1 py-1.5 px-2">
        <HiOutlineSearch />
        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder={t("friends.findFriend")}
          className=" border-none bg-transparent"
        />
      </form>
      <Select
        onChange={handleChangeParams}
        className=" col-span-2 md:col-span-1"
        icon={<BiSort />}
        defaultValue={{ label: `${t("friends.name")} (A-Z)`, value: "asc" }}
      >
        <Select.Options>
          <Select.Option value="asc">{t("friends.name")} (A-Z)</Select.Option>
          <Select.Option value="des">{t("friends.name")} (Z-A)</Select.Option>
        </Select.Options>
      </Select>
    </div>
  );
};
export default FriendActions;
