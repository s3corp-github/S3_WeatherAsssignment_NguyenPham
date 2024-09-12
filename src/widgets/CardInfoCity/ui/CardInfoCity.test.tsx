import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CardInfoCity from './CardInfoCity'
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
  pm10: 0.5,
}

describe('CardInfoCity Component', () => {
  test('should display city information correctly', () => {
    render(<CardInfoCity city={mockCity} onRemoveCity={jest.fn()} />)

    expect(screen.getByText('Moscow, 21.96°C')).toBeInTheDocument()

    expect(screen.getByText('PM 10: 0.5 µg/m³')).toBeInTheDocument()

    expect(screen.getByText('Wind: 3.39 m/s')).toBeInTheDocument()
  })

  test('should call onRemoveCity when remove button is clicked', () => {
    const mockOnRemoveCity = jest.fn()
    render(<CardInfoCity city={mockCity} onRemoveCity={mockOnRemoveCity} />)

    fireEvent.click(screen.getByText('×'))

    expect(mockOnRemoveCity).toHaveBeenCalled()
  })
})
