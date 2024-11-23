import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}${url}`,
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
