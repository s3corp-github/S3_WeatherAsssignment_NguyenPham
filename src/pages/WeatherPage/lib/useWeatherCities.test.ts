import { renderHook, act, waitFor } from '@testing-library/react'

import useWeatherCities from './useWeatherCities'
import { getWeatherCity } from '../../../shared'

jest.mock('.../../../shared', () => ({
  getWeatherCity: jest.fn(),
  DEFAULT_TEMPERATURE_FILTER: 10,
}))

const mockGetWeatherCity = getWeatherCity as jest.Mock

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

  test('should set loading state correctly', async () => {
    mockGetWeatherCity.mockResolvedValue({
      name: 'Moscow',
      sys: { id: 1 },
      main: { temp: 20 },
    })

    const { result } = renderHook(() => useWeatherCities())

    act(() => {
      result.current.findCityByName('Moscow')
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.listCitiesFilterTemp).toHaveLength(1)
  })

  test('should remove city from list and refListBlockCallApi', async () => {
    mockGetWeatherCity.mockResolvedValue(mockCity)

    const { result } = renderHook(() => useWeatherCities())

    act(() => {
      result.current.findCityByName('Moscow')
    })

    expect(result.current.isLoading).toBe(true)

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
