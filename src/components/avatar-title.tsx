import { twMerge } from "tailwind-merge";
import Avatar from "./avatar";
const AvatarTitle = ({
  children,
  className,
  avatar,
  title,
}: {
  avatar: string;
  avatarSize?: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={twMerge("flex gap-3 py-3  h-[72px]", className)}>
      <Avatar size="large" src={avatar} />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg text-[var(--color-grey-800)]">{title}</h4>
            {children}
          </div>
          {/* actions */}
        </div>
      </div>
    </div>
  );
};
export default AvatarTitle;
