const API_KEY = 'eec8a3e0755262349bb40afcf5f89203'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export const getWeatherCity = async (city: string) => {
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  )
  if (response.ok) {
    return response.json()
  }
  throw new Error('City not found')
}
