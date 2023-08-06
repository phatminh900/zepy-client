import { twMerge } from "tailwind-merge";
const RowLayout = ({
  title,
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className={twMerge("flex items-center mb-3", className)}>
      <p className="text-sm md:text-base max-w-[100px] w-full  font-semibold">
        {title}:{" "}
      </p>
      {children}
    </div>
  );
};
export default RowLayout;
