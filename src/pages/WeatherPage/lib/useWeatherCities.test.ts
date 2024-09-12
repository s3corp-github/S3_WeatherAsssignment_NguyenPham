import { renderHook, act, waitFor } from '@testing-library/react'
import useWeatherCities from './useWeatherCities'
import { getWeatherCity, getInfoAirByLatLng } from '../../../shared'

jest.mock('../../../shared', () => ({
  getWeatherCity: jest.fn(),
  getInfoAirByLatLng: jest.fn(),
  DEFAULT_TEMPERATURE_FILTER: 10,
}))

const mockGetWeatherCity = getWeatherCity as jest.Mock
const mockGetInfoAirByLatLng = getInfoAirByLatLng as jest.Mock

const mockCity = {
  coord: {
    lon: 37.6156,
    lat: 55.7522,
  },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04n',
    },
  ],
  base: 'stations',
  main: {
    temp: 21.96,
    feels_like: 21.62,
    temp_min: 20.75,
    temp_max: 22.24,
    pressure: 1017,
    humidity: 54,
    sea_level: 1017,
    grnd_level: 1000,
  },
  visibility: 10000,
  wind: {
    speed: 3.39,
    deg: 144,
    gust: 6.76,
  },
  clouds: {
    all: 100,
  },
  dt: 1725985877,
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

const mockAirInfo = {
  list: [
    {
      components: {
        pm10: 15.3,
      },
    },
  ],
}

describe('useWeatherCities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should initialize with default states', () => {
    const { result } = renderHook(() => useWeatherCities())
    expect(result.current.isLoading).toBe(false)
    expect(result.current.message).toBe('')
    expect(result.current.listCitiesFilterTemp).toEqual([])
  })

  test('should set loading state correctly and fetch data', async () => {
    mockGetWeatherCity.mockResolvedValue(mockCity)
    mockGetInfoAirByLatLng.mockResolvedValue(mockAirInfo)

    const { result } = renderHook(() => useWeatherCities())

    act(() => {
      result.current.findCityByName('Moscow')
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.listCitiesFilterTemp).toHaveLength(1)
    expect(result.current.listCitiesFilterTemp[0].pm10).toBe(15.3)
  })

  test('should handle API errors gracefully', async () => {
    mockGetWeatherCity.mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useWeatherCities())

    act(() => {
      result.current.findCityByName('UnknownCity')
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.message).toBe('API error')
  })

  test('should remove city from list', async () => {
    mockGetWeatherCity.mockResolvedValue(mockCity)
    mockGetInfoAirByLatLng.mockResolvedValue(mockAirInfo)

    const { result } = renderHook(() => useWeatherCities())

    act(() => {
      result.current.findCityByName('Moscow')
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.onRemoveCity(mockCity)
    })

    expect(result.current.listCitiesFilterTemp).toHaveLength(0)
    expect(result.current.message).toBe('')
  })
})
