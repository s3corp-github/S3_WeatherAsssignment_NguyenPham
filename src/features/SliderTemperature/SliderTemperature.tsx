import { ChangeEvent, useCallback, useState } from 'react'
import './SliderTemperature.css'
import { debounce, DEFAULT_TEMPERATURE_FILTER } from '../../shared'
import React from 'react'

interface SliderTemperatureProps {
  min?: number
  max?: number
  defaultValue?: number
  onChangeTemperature: (value: number) => void
}

const SliderTemperature = ({
  min = -50,
  max = 50,
  defaultValue = DEFAULT_TEMPERATURE_FILTER,
  onChangeTemperature,
}: SliderTemperatureProps) => {
  const [valueSlider, setValueSlider] = useState(defaultValue)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeSlider = useCallback(
    debounce((value: number) => {
      onChangeTemperature(value)
    }, 100),
    [onChangeTemperature]
  )

  return (
    <div className="slider-temperature">
      <p className="slider-temperature__label">Temperature</p>
      <input
        type="range"
        min={min}
        max={max}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValueSlider(+e.target.value)
          onChangeSlider(+e.target.value)
        }}
        defaultValue={defaultValue}
        data-testid="slider-temperature"
        className="slider-temperature__slider"
      />
      <p className="slider-temperature__value" data-testid="slider-value">
        {valueSlider} °C
      </p>
    </div>
  )
}

export default SliderTemperature
