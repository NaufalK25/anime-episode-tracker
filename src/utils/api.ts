export const fetchWrapper = async (endpoint: string) => {
  const response = await fetch(`https://api.jikan.moe/v4${endpoint}`);
  const data = await response.json();
  return data;
};
