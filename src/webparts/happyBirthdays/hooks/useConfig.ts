import { useState, useEffect } from 'react';
import {
  getBirthdays,
  getConfig,
  getImages,
} from '../services/webpartServices';
import { Birthday, Config, Image } from '../types';

interface HookState {
  config: Config;
  birthdays: Birthday[];
  gallery: Image[];
}
function useConfig() {
  const [birthdays, setBirthdays] = useState<HookState['birthdays']>([]);
  const [config, setConfig] = useState<HookState['config']>(null);
  const [gallery, setGallery] = useState<HookState['gallery']>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const config = await getConfig();
      const data = await getBirthdays();
      const images = await getImages();
      setConfig(config);
      setBirthdays(data);
      setGallery(images);
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
    gallery,
  };
}

export default useConfig;
