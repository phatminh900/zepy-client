import { FiUsers } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { BiSort } from "react-icons/bi";
import ReturnButtonTitle from "src/components/return-button-title";
import RowHeader from "src/ui/row-header/row-header.component";
import Select from "src/components/select";
import { useGetAllFriend } from "src/features/contact/contact.hook";
import { useGetUser } from "src/hooks/useAuth";
import Loader from "src/ui/Loader";
import FriendList from "./friend-list.component";

const Friends = () => {
  const { user } = useGetUser();
  const { friends, isLoading } = useGetAllFriend(user!.id);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <RowHeader className="border-b border-b-[var(--color-grey-400)]">
            <ReturnButtonTitle>
              <div className="flex gap-1.5 items-center">
                <span className="text-2xl">
                  <FiUsers />
                </span>
                <p>Friend Lists</p>
              </div>
            </ReturnButtonTitle>
          </RowHeader>
          <div className="pt-4 px-4">
            <p className="mb-3">Contacts ({friends?.length})</p>

            {/* actions */}
            <div className="grid grid-cols-2 items-center gap-2">
              <form className="flex  items-center col-span-2 bg-[var(--color-grey-100)]  md:col-span-1 border border-[var(--color-grey-400)] gap-1 py-1.5 px-2">
                <HiOutlineSearch />
                <input
                  type="text"
                  placeholder="Search a friend"
                  className=" border-none bg-transparent"
                />
              </form>
              <Select
                className=" col-span-2 md:col-span-1"
                icon={<BiSort />}
                defaultValue={{ label: "Name (A-Z)", value: "name-asc" }}
              >
                <Select.Options>
                  <Select.Option value="name-asc">Name (A-Z)</Select.Option>
                  <Select.Option value="name-des">Name (Z-A)</Select.Option>
                </Select.Options>
              </Select>
            </div>
            {/* List */}
            <div className="mt-3 overflow-y-scroll">
              {!friends?.length ? (
                <p className="text-center">Quickly add a new friend 🥰</p>
              ) : (
                <ul className="">
                  <FriendList friends={friends} />
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Friends;
