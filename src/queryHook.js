export const fetchLaunches = async (data) => {
  // console.log(data.queryKey[0]);\
  const limit = data.queryKey[0];
  const offset = data.queryKey[1];
  console.log(limit);
  const res = await fetch(`https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}`);
  return res.json();
};