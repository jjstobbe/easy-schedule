import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(url);

    // Unauthorized, return null
    if (response.status === 403) {
      setData(null);
    } else {
      const json = await response.json();
      setData(json);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
}

export { useFetch };
