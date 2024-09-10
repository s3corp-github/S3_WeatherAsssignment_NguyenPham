const { REACT_APP_API_KEY, REACT_APP_BASE_URL } = process.env;

export const getWeatherCity = async (city: string) => {
  const response = await fetch(
    `${REACT_APP_BASE_URL}?q=${city}&appid=${REACT_APP_API_KEY}&units=metric`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error('City not found');
};
