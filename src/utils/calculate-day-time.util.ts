import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
} from "date-fns";

export const requestedTimeHours = (date: string | Date) => {
  return differenceInHours(Date.now(), new Date(date));
};
export const requestedTimeMinutes = (date: string | Date) => {
  return differenceInMinutes(Date.now(), new Date(date));
};
export const requestedDays = (date: string | Date) => {
  return differenceInDays(Date.now(), new Date(date));
};
