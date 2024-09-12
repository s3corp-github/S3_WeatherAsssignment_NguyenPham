const { REACT_APP_API_KEY, REACT_APP_BASE_URL } = process.env

export const getWeatherCity = async (city: string) => {
  const response = await fetch(
    `${REACT_APP_BASE_URL}/weather?q=${city}&appid=${REACT_APP_API_KEY}&units=metric`
  )
  if (response.ok) {
    return response.json()
  }
  throw new Error('City not found')
}

export const getInfoAirByLatLng = async (lat: number, lng: number) => {
  const response = await fetch(
    `${REACT_APP_BASE_URL}/air_pollution?lat=${lat}&lon=${lng}&appid=${REACT_APP_API_KEY}`
  )
  if (response.ok) {
    return response.json()
  }
  throw new Error('No Air Quality information found')
}
