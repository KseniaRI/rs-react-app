const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Something went wrong, unable to fetch data from ${url}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('/ ~ fetchData ~ error:', error);
  }
  return [];
};

export const getData = async (currentPage: number) => {
  const url = `https://swapi.dev/api/planets/?page=${currentPage}`;
  return fetchData(url);
};

export const getDataByQuery = async (query: string) => {
  const url = `https://swapi.dev/api/planets/?search=${query}`;
  return fetchData(url);
};
