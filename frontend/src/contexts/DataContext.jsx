import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load data.json');
        return res.json();
      })
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
