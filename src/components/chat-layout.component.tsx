const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-[100dvh] grid-rows-[65px_1fr_40px] md:grid-rows-[72px_1fr_60px] overflow-hidden [&>*]:px-2 md:[&>*]:px-5">
      {children}
    </div>
  );
};
const ChatLayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-4 pb-2 md:pt-6 md:pb-3 bg-[var(--color-grey-200)] overflow-y-scroll flex-1">
      {children}
    </div>
  );
};
export { ChatLayout, ChatLayoutContent };
