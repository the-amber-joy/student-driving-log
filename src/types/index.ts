type HoursDriven = {
  day_hours: number;
  night_hours: number;
};

type WithTotalHours<T> = T & {
  total_hours: number;
};

export function computeTotalHours<Driver extends HoursDriven>(
  driver: Driver
): WithTotalHours<Driver> {
  return {
    ...driver,
    total_hours: driver.day_hours + driver.night_hours,
  };
}
