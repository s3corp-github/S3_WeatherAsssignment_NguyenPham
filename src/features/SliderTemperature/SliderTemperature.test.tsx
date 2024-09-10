import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SliderTemperature from './SliderTemperature';
import userEvent from '@testing-library/user-event';
describe('SliderTemperature Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  test('renders slider with initial value', () => {
    render(
      <SliderTemperature
        min={0}
        max={100}
        defaultValue={50}
        onChangeTemperature={e => {}}
      />
    );

    const slider = screen.getByTestId('slider-temperature');

    expect(slider).toBeInTheDocument();
  });

  test('calls onChange callback when value changes', () => {
    const handleChange = jest.fn();
    render(
      <SliderTemperature
        min={0}
        max={100}
        defaultValue={50}
        onChangeTemperature={handleChange}
      />
    );

    const slider = screen.getByTestId('slider-temperature');

    fireEvent.change(slider, { target: { value: 75 } });
    jest.advanceTimersByTime(400);
    expect(slider).toHaveValue('75');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(75); // Kiểm tra xem callback được gọi với giá trị đúng
  });

  //   test('changes value when user moves slider', () => {
  //     render(<SliderTemperature min={0} max={100} defaultValue={50} />);

  //     const slider = screen.getByTestId('slider');

  //     // Thay đổi giá trị của slider
  //     fireEvent.change(slider, { target: { value: '75' } });

  //     expect(slider).toHaveValue('75');
  //     expect(screen.getByTestId('slider-value')).toHaveTextContent('75');
  //   });

  //   test('respects min and max boundaries', () => {
  //     render(<SliderTemperature min={0} max={100} defaultValue={50} />);

  //     const slider = screen.getByTestId('slider');

  //     // Giá trị vượt quá min và max
  //     fireEvent.change(slider, { target: { value: '150' } });
  //     expect(slider.value).toBe('100'); // giá trị max là 100

  //     fireEvent.change(slider, { target: { value: '-10' } });
  //     expect(slider.value).toBe('0'); // giá trị min là 0
  //   });
});
