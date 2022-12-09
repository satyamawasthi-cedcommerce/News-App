export const fetchLaunches = async (data) => {
  let queryString = "";
  if (data.queryKey.length === 3) {
    const limit = data.queryKey[0];
    const offset = data.queryKey[1];
    const sort = data.queryKey[2];
    queryString = `?&order=${sort}&offset=${offset}&limit=${limit}`;
  } else {
    const flight = data.queryKey[0];
    queryString = `/${flight}`
  }
  const res = await fetch(
    `https://api.spacexdata.com/v3/launches${queryString}`
  );
  return res.json();
};
