import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SliderTemperature from './SliderTemperature'

describe('SliderTemperature Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
  test('renders slider with initial value', () => {
    render(
      <SliderTemperature
        min={0}
        max={100}
        defaultValue={50}
        onChangeTemperature={e => {}}
      />
    )

    const slider = screen.getByTestId('slider-temperature')

    expect(slider).toBeInTheDocument()
  })

  test('calls onChange callback when value changes', () => {
    const handleChange = jest.fn()
    render(
      <SliderTemperature
        min={0}
        max={100}
        defaultValue={50}
        onChangeTemperature={handleChange}
      />
    )

    const slider = screen.getByTestId('slider-temperature')

    fireEvent.change(slider, { target: { value: 75 } })
    jest.advanceTimersByTime(400)
    expect(slider).toHaveValue('75')

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(75)
  })

  test('changes value when user moves slider', () => {
    const handleChange = jest.fn()

    render(
      <SliderTemperature
        min={0}
        max={100}
        defaultValue={50}
        onChangeTemperature={handleChange}
      />
    )

    const slider = screen.getByTestId('slider-temperature')

    fireEvent.change(slider, { target: { value: '75' } })
    jest.advanceTimersByTime(400)

    expect(slider).toHaveValue('75')
    expect(screen.getByTestId('slider-value')).toHaveTextContent('75')
  })

  test('respects min and max boundaries', () => {
    const handleChange = jest.fn()
    render(
      <SliderTemperature
        min={0}
        max={100}
        defaultValue={50}
        onChangeTemperature={handleChange}
      />
    )

    const slider = screen.getByTestId('slider-temperature')

    fireEvent.change(slider, { target: { value: '150' } })
    jest.advanceTimersByTime(400)

    expect(slider).toHaveValue('100')

    fireEvent.change(slider, { target: { value: '-10' } })
    expect(slider).toHaveValue('0')
  })
})
