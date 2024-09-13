import { getInfoAirByLatLng, getWeatherCity } from './weatherApi'
const { REACT_APP_API_KEY, REACT_APP_BASE_URL } = process.env

global.fetch = jest.fn()
jest.mock('.../../../shared', () => ({
  getWeatherCity: jest.fn(),
  DEFAULT_TEMPERATURE_FILTER: 10,
}))
describe('getWeatherCity', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return data when API call is successful', async () => {
    const mockResponse = {
      coord: { lon: 37.6156, lat: 55.7522 },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      base: 'stations',
      main: {
        temp: 23.56,
        feels_like: 23.2,
        temp_min: 22.29,
        temp_max: 24.24,
        pressure: 1017,
        humidity: 47,
        sea_level: 1017,
        grnd_level: 1000,
      },
      visibility: 10000,
      wind: { speed: 5.05, deg: 157, gust: 7.31 },
      clouds: { all: 100 },
      dt: 1725977985,
      sys: {
        type: 2,
        id: 2095214,
        country: 'RU',
        sunrise: 1725936734,
        sunset: 1725984061,
      },
      timezone: 10800,
      id: 524901,
      name: 'Moscow',
      cod: 200,
    }

    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const city = 'Moscow'
    const data = await getWeatherCity(city)

    expect(data).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${REACT_APP_BASE_URL}/weather?q=${city}&appid=${REACT_APP_API_KEY}&units=metric`
    )
  })

  test('should throw an error when API call fails', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    })

    const city = 'InvalidCity'

    await expect(getWeatherCity(city)).rejects.toThrow('City not found')
    expect(fetch).toHaveBeenCalledWith(
      `${REACT_APP_BASE_URL}/weather?q=${city}&appid=${REACT_APP_API_KEY}&units=metric`
    )
  })

  it('should return air quality information when response is ok', async () => {
    const mockData = { aqi: 50 }
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    })

    const lat = 55.7522
    const lng = 37.6156

    const result = await getInfoAirByLatLng(lat, lng)

    expect(fetch).toHaveBeenCalledWith(
      `${REACT_APP_BASE_URL}/air_pollution?lat=${lat}&lon=${lng}&appid=${REACT_APP_API_KEY}`
    )
    expect(result).toEqual(mockData)
  })

  it('should throw an error when response is not ok', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({}),
    })

    const lat = 40.7128
    const lng = 1

    await expect(getInfoAirByLatLng(lat, lng)).rejects.toThrow(
      'No Air Quality information found'
    )
  })
})
