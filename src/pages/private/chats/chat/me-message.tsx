const MeMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-end ">
      <div className="bg-[var(--color-primary-light)] text-[var(--color-grey-0)] px-3 py-2 rounded-md">
        <p>{message}</p>
        <span className="text-[10px]">8:53</span>
      </div>
    </div>
  );
};
export default MeMessage;
