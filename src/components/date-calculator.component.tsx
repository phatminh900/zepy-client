import {
  requestedDays,
  requestedTimeHours,
  requestedTimeMinutes,
} from "src/utils/calculate-day-time.util";
import { twMerge } from "tailwind-merge";

const DateCalculator = ({
  time,
  className,
}: {
  time: Date | string;
  className?: string;
}) => {
  const mins = requestedTimeMinutes(time);
  const hours = requestedTimeHours(time);
  const days = requestedDays(time);
  return (
    <span className={twMerge(" text-[10px] md:text-xs italic flex", className)}>
      {mins > 59 &&
        mins < 1439 &&
        `${hours} ${hours === 1 ? "hour" : "hours"} ago`}
      {mins === 0 && "Just now"}
      {mins > 1 && mins < 59 && `${mins} ago`}

      {mins > 1440 && `${days > 1 ? `${days} days ago` : `Yesterday`}`}
    </span>
  );
};
export default DateCalculator;
