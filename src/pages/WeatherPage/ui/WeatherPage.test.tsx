import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeatherPage from './WeatherPage';
import useWeatherCities from '../lib/useWeatherCities';

jest.mock('../lib/useWeatherCities', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('WeatherPage', () => {
  const mockUseWeatherCities = useWeatherCities as jest.Mock;

  beforeEach(() => {
    mockUseWeatherCities.mockReturnValue({
      isLoading: false,
      message: '',
      listCitiesFilterTemp: [],
      findCityByName: jest.fn(),
      onRemoveCity: jest.fn(),
      setFilterTemperature: jest.fn(),
    });
  });

  it('should render the title and input field correctly', () => {
    render(<WeatherPage />);
    expect(screen.getByText(/Weather App/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search by city name/i)
    ).toBeInTheDocument();
  });

  it('should display loading state in InputSearchCity when isLoading is true', () => {
    mockUseWeatherCities.mockReturnValue({
      isLoading: true,
      message: '',
      listCitiesFilterTemp: [],
      findCityByName: jest.fn(),
      onRemoveCity: jest.fn(),
      setFilterTemperature: jest.fn(),
    });

    render(<WeatherPage />);
    expect(screen.getByText(/Search.../i)).toBeInTheDocument();
  });

  it('should display an error message when message is provided', () => {
    mockUseWeatherCities.mockReturnValue({
      isLoading: false,
      message: 'City not found',
      listCitiesFilterTemp: [],
      findCityByName: jest.fn(),
      onRemoveCity: jest.fn(),
      setFilterTemperature: jest.fn(),
    });

    render(<WeatherPage />);
    expect(screen.getByText(/City not found/i)).toBeInTheDocument();
  });

  it('should call findCityByName when a city name is searched', () => {
    const findCityByNameMock = jest.fn();
    mockUseWeatherCities.mockReturnValue({
      isLoading: false,
      message: '',
      listCitiesFilterTemp: [],
      findCityByName: findCityByNameMock,
      onRemoveCity: jest.fn(),
      setFilterTemperature: jest.fn(),
    });

    render(<WeatherPage />);

    const input = screen.getByPlaceholderText(/Search by city name/i);
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(screen.getByText('Search'));

    expect(findCityByNameMock).toHaveBeenCalledWith('London');
  });

  it('should render city cards when cities are available', () => {
    mockUseWeatherCities.mockReturnValue({
      isLoading: false,
      message: '',
      listCitiesFilterTemp: [
        {
          sys: { id: 1 },
          name: 'London',
          main: { temp: 15 },
          wind: { speed: 5, deg: 180 },
        },
      ],
      findCityByName: jest.fn(),
      onRemoveCity: jest.fn(),
      setFilterTemperature: jest.fn(),
    });

    render(<WeatherPage />);

    expect(screen.getByText(/London, 15°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 5 m\/s/i)).toBeInTheDocument();
  });
});
