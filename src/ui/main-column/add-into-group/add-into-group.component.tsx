import { HiSearch } from "react-icons/hi";
import Friend from "./friend.component";

import Button from "src/components/button";
import useAddIntoGroup from "./add-into-group.hook";

const AddIntoGroup = () => {
  const {
    isCreatingNewGroup,
    isSuccess,
    friends,
    onSubmit,
    formRef,
    errors,
    register,
    handleAddFriend,
  } = useAddIntoGroup();
  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="px-4 flex flex-col h-full"
      >
        <div className="mb-4 ">
          <h3 className="text-sm mb-2">Group name</h3>
          <div
            className={`px-2 py-1.5 w-full flex items-center gap-1.5 border ${
              errors?.groupName?.message ? "border-[var(--color-danger)]" : ""
            } `}
          >
            <input
              type="text"
              {...register("groupName", {
                required: "This field is required.",
              })}
              placeholder="Your group's name"
              className="bg-none outline-none
              "
            />
          </div>
        </div>
        <h3>Add your friends into group</h3>
        <div className="px-2 py-1.5 w-full flex items-center gap-1.5">
          <HiSearch />
          <input
            type="text"
            placeholder="Find your friend"
            className="bg-none outline-none"
          />
        </div>
        <div className="py-2 border-t border-t-[var(--color-grey-400)]">
          {friends && (
            <FriendList
              key={+isSuccess}
              friends={friends}
              onHandleAddFriend={handleAddFriend}
            />
          )}
        </div>
        <Button disabled={isCreatingNewGroup} className="mt-auto">
          {isCreatingNewGroup ? "Creating..." : "  Create a new Group"}
        </Button>
      </form>
    </>
  );
};
export default AddIntoGroup;

function FriendList({
  friends,
  onHandleAddFriend,
}: {
  onHandleAddFriend: ({ id }: { id: string }) => void;
  friends: IFriend[];
}) {
  return (
    <ul className="flex flex-col gap-4 py-3 h-[55vh] overflow-y-scroll">
      <h2>All your friend.</h2>
      {friends?.map((friend) => (
        <Friend
          key={friend.id}
          onHandleAddFriend={onHandleAddFriend}
          id={friend.friend_profile.id}
          avatar={friend.friend_profile.avatar}
          fullName={friend.friend_profile.fullname}
        />
      ))}
    </ul>
  );
}
