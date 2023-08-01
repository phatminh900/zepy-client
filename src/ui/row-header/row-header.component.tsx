import { twMerge } from "tailwind-merge";
interface IRowHeader extends Children {
  className?: string;
}
const RowHeader = ({ className, children }: IRowHeader) => {
  return (
    <div
      className={twMerge(
        "flex gap-3 py-3 px-5 h-[72px] bg-[var(--color-grey-0)]",
        className
      )}
    >
      {children}
    </div>
  );
};
export default RowHeader;
