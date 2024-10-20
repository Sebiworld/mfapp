import { useState, useEffect } from "react";

export const useCurrentDate = (interval: number = 1000) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), interval);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [interval]);

  return date;
};
