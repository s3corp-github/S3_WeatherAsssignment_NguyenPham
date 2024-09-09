import { ChangeEvent, useCallback, useState } from 'react'
import './SliderTemperature.css'
import { debounce } from '../../shared'

interface SliderTemperatureProps {
  min?: number
  max?: number
  defaultValue?: number
  onChangeTemperature: (value: number) => void
}

const SliderTemperature = ({
  min = 0,
  max = 100,
  defaultValue = 20,
  onChangeTemperature,
}: SliderTemperatureProps) => {
  const [valueSlider, setValueSlider] = useState(defaultValue)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeSlider = useCallback(
    debounce((value: number) => {
      onChangeTemperature(value)
    }, 150),
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
        className="slider-temperature__slider"
      />
      <p className="slider-temperature__value">{valueSlider} °C</p>
    </div>
  )
}

export default SliderTemperature
