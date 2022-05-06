import { useState, useEffect } from 'react';
import { getConfig } from '../services/webpartServices';

function useConfig() {
  const [config, setConfig] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getConfig()
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(({ status, data }) => {
        setLoading(false);
        setError(data.responseBody['odata.error'].message.value);
        console.log({
          status,
          data,
        });
      });
  }, []);

  return {
    isLoading: loading,
    ifFail: error,
    configuration: config,
  };
}

export default useConfig;
