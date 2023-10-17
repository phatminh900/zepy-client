import { useTranslation } from "react-i18next";
import {
  requestedDays,
  requestedTimeHours,
  requestedTimeMinutes,
  requestedSeconds,
} from "src/utils/calculate-day-time.util";
import { twMerge } from "tailwind-merge";

const DateCalculator = ({
  time,
  className,
}: {
  time: Date | string;
  className?: string;
}) => {
  const { t } = useTranslation("date");
  const mins = requestedTimeMinutes(time);
  const hours = requestedTimeHours(time);
  const days = requestedDays(time);
  const seconds = requestedSeconds(time);
  return (
    <span
      className={twMerge(
        " text-[8px] whitespace-nowrap md:text-xs italic flex",
        className
      )}
    >
      {mins > 59 &&
        mins < 1439 &&
        `${hours} ${hours === 1 ? t("hour") : t("hours")} ${t("ago")}`}
      {/* {seconds < 59 && `${seconds} seconds ago`} */}
      {mins === 0 && seconds > 1 && `few seconds ago`}
      {mins === 0 && seconds == 0 && `${t("now")}`}
      {mins > 1 && mins < 59 && `${mins} ${t("mins")} ${t("ago")}`}

      {mins > 1440 &&
        `${
          days > 1 ? `${days} ${t("days")} ${t("ago")}` : `${t("yesterday")}`
        }`}
    </span>
  );
};
export default DateCalculator;
