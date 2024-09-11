import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputSearchCity from './InputSearchCity';

const mockOnChangeSearchCity = jest.fn();

describe('InputSearchCity Component', () => {
  afterEach(cleanup);

  test('renders correctly', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={false}
      />
    );
    expect(
      screen.getByPlaceholderText('Search by city name')
    ).toBeInTheDocument();
  });

  test('displays clear button when there is text input', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={false}
      />
    );
    const input = screen.getByPlaceholderText('Search by city name');
    fireEvent.change(input, { target: { value: 'Moscow' } });
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  test('hides clear button when text is cleared', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={false}
      />
    );
    const input = screen.getByPlaceholderText('Search by city name');
    fireEvent.change(input, { target: { value: 'Moscow' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  test('shows suggestions and handles item click', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={false}
      />
    );
    const input = screen.getByPlaceholderText('Search by city name');
    fireEvent.click(input);

    fireEvent.change(input, { target: { value: 'Moscow' } });
    expect(screen.getByText('Moscow')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Moscow'));
    expect(mockOnChangeSearchCity).toHaveBeenCalledWith('Moscow');
  });

  test('calls onChangeSearchCity when search button is clicked', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={false}
      />
    );
    const input = screen.getByPlaceholderText('Search by city name');
    fireEvent.change(input, { target: { value: 'Moscow' } });
    fireEvent.click(screen.getByText('Search'));
    expect(mockOnChangeSearchCity).toHaveBeenCalledWith('Moscow');
  });

  test('handles outside click to hide suggestions', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={false}
      />
    );
    const input = screen.getByPlaceholderText('Search by city name');
    fireEvent.click(input);

    fireEvent.change(input, { target: { value: 'Moscow' } });

    expect(screen.getByText('Moscow')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByText('Moscow')).not.toBeInTheDocument();
  });

  test('handles clear input when click clear button', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={false}
      />
    );
    const input = screen.getByPlaceholderText('Search by city name');
    fireEvent.change(input, { target: { value: 'Moscow' } });
    const buttonClear = screen.getByText('×');

    expect(buttonClear).toBeInTheDocument();
    fireEvent.click(buttonClear);

    expect(input).toHaveValue('');
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  test('handles when click search button', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={false}
      />
    );
    const input = screen.getByPlaceholderText('Search by city name');
    fireEvent.change(input, { target: { value: 'Moscow' } });
    const buttonClear = screen.getByText('Search');

    expect(buttonClear).toBeInTheDocument();
    fireEvent.click(buttonClear);

    expect(input).toHaveValue('Moscow');
  });

  test('displays loading state correctly', () => {
    render(
      <InputSearchCity
        onChangeSearchCity={mockOnChangeSearchCity}
        isLoading={true}
      />
    );

    expect(screen.getByText('Search...')).toBeInTheDocument();
    expect(screen.queryByText('Search')).not.toBeInTheDocument();
  });
});
