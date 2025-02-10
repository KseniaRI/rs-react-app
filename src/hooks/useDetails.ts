import { useEffect, useState } from 'react';
import { Planet } from '../types';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { getDataByQuery } from '../api/getData';

export const useDetails = () => {
  const [searchParams] = useSearchParams();
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [data, setData] = useState<Partial<Planet>>({});
  const { closeDetails } = useOutletContext<{ closeDetails: () => void }>();
  const name = searchParams.get('details');

  useEffect(() => {
    if (!name) return;
    setLoadingDetails(true);
    const fetchDataByName = async () => {
      try {
        const response = await getDataByQuery(name);
        const res: Partial<Planet>[] = response.results;
        setData(res[0]);
      } catch (error) {
        console.log('/ ~ fetchDataByName ~ error:', error);
      } finally {
        setLoadingDetails(false);
      }
    };
    fetchDataByName();
  }, [name]);

  return {
    data,
    loadingDetails,
    closeDetails,
    name,
  };
};
