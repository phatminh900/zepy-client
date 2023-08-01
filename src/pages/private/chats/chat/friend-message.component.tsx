import Avatar from "src/components/avatar";

const FriendMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex gap-3">
      <Avatar size="medium" />
      <div className="bg-[var(--color-grey-0)] px-3 py-2 rounded-md">
        <p>Hello</p>
        <span className="text-[10px]">8:53</span>
      </div>
    </div>
  );
};
export default FriendMessage;
