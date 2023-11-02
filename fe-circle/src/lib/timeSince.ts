const timeSince = (initialTime: Date | string) => {
  const time =
    initialTime instanceof Date ? initialTime : new Date(initialTime);

  const currentTime = Date.now();

  const relativeTimeFormat = new Intl.RelativeTimeFormat('en');

  const timeRange = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };

  const elapsedTime = (time.getTime() - currentTime) / 1000;

  for (const key in timeRange) {
    if (timeRange[key as keyof typeof timeRange] < Math.abs(elapsedTime)) {
      const delta = elapsedTime / timeRange[key as keyof typeof timeRange];

      return relativeTimeFormat.format(
        Math.round(delta),
        key as keyof typeof timeRange
      );
    }
  }

  return 'Just now';
};

export default timeSince;
