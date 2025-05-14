/** @format */

import moment from 'moment';
import { useCallback } from 'react';
const useViewModel = () => {
  const generateGreetings = useCallback(() => {
    const currentHour = parseInt(moment().format('HH'), 10);

    if (currentHour >= 1 && currentHour < 12) {
      return {
        title: 'Good Morning ☀️',
        description: 'Start your day with a cinematic adventure.',
      };
    } else if (currentHour >= 12 && currentHour < 18) {
      return {
        title: 'Good Afternoon 🎬',
        description: 'Take a break and dive into a great movie.',
      };
    } else if (currentHour >= 18 && currentHour < 24) {
      return {
        title: 'Good Evening 🌙',
        description: 'Unwind with a story worth watching tonight.',
      };
    } else {
      return {
        title: 'Hello 👋',
        description: 'Any time is a good time for a good movie.',
      };
    }
  }, []);
  return {
    generateGreetings,
  };
};

export default useViewModel;
