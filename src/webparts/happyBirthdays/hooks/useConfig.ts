import { useState, useEffect } from 'react';
import { getBirthdays, getConfig } from '../services/webpartServices';
import { Birthday, Config } from '../types';

interface HookState {
  config: Config;
  birthdays: Birthday[];
}
function useConfig() {
  const [birthdays, setBirthdays] = useState<HookState['birthdays']>([]);
  const [config, setConfig] = useState<HookState['config']>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const config = await getConfig();
      const data = await getBirthdays();
      setConfig(config);
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
    settings: config,
  };
}

export default useConfig;
