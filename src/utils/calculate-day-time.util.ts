import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
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
export const requestedSeconds = (date: string | Date) => {
  return differenceInSeconds(Date.now(), new Date(date));
};
