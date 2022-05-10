import { useState, useEffect } from 'react';
import { getBirthdays } from '../services/webpartServices';
import { Birthday } from '../types';

interface HookState {
  config: {
    mainImage?: string;
    bgCard?: string;
    isBirthdayImage?: string;
    birthdayImage?: string;
  };
  birthdays: Birthday[];
}
function useConfig() {
  const [birthdays, setBirthdays] = useState<HookState['birthdays']>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const data = await getBirthdays();
      setBirthdays(data);
      setLoading(false);
    } catch ({ status, data }) {
      setLoading(false);
      setError(data.responseBody['odata.error'].message.value);
      console.log({
        status,
        data,
      });
    }
  };
  useEffect(() => {
    fetchConfig();
  }, []);

  return {
    isLoading: loading,
    fail: error,
    birthdays,
  };
}

export default useConfig;
