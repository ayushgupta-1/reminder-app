export const getCurrentDate = () => {
  const currentDay = new Date();

  // Get day, month, and year
  const date = currentDay.getDate(); // Day of the month (1-31)
  const month = currentDay.getMonth() + 1; // Month (0-11, so add 1 to get actual month)
  const monthName = currentDay.toLocaleString("default", { month: "long" });
  const year = currentDay.getFullYear(); // Full year (e.g., 2024)

  // Get the day of the week (0-6, where 0 is Sunday)
  const dayNumber = currentDay.getDay();
  // Array mapping day numbers to day names
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Get the day name using the array
  const dayName = dayNames[dayNumber];

  const tomorrowTimestamp = currentDay.getTime() + 24 * 60 * 60 * 1000;

  return {
    date,
    month,
    monthName,
    year,
    dayName,
    tomorrowTimestamp,
  };
};
