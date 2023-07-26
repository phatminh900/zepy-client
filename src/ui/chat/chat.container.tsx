import Avatar from "src/components/avatar";

const Chat = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex gap-3">
        <Avatar size="large" />
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="text-lg text-[var(--color-grey-800)]">TITLE</h4>

            <div>
              <span className={` text-[12px] italic`}>1 hour 111ago</span>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px]">You : SO BORIN21321G!!!</p>
            <span className="flex w-4 flex- items-center justify-center h-4 rounded-full bg-[var(--color-grey-300)] text-[10px]">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
