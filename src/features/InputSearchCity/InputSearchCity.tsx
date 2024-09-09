import { ChangeEvent, useRef, useState } from 'react'
import './InputSearchCity.css'

interface InputSearchCityProps {
  onChangeSearchCity(name: string): void
}

const InputSearchCity = ({ onChangeSearchCity }: InputSearchCityProps) => {
  const refInputSearch = useRef<HTMLInputElement>(null)
  const [showClearButton, setShowClearButton] = useState<boolean>(false)

  const handleSearch = () => {
    onChangeSearchCity(refInputSearch.current?.value ?? '')
  }

  const onClearTextSearch = () => {
    onChangeSearchCity('')
    setShowClearButton(false)
    if (refInputSearch.current) {
      refInputSearch.current.value = ''
    }
  }

  return (
    <div className="input-search-city">
      <div className="input-search-city__input">
        {showClearButton && (
          <span
            className="input-search-city__input__btn-clear"
            onClick={onClearTextSearch}
          >
            ×
          </span>
        )}
        <input
          ref={refInputSearch}
          type="text"
          placeholder="Search by city name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value && !showClearButton) {
              setShowClearButton(true)
              return
            }
            if (!e.target.value && showClearButton) {
              setShowClearButton(false)
              return
            }
          }}
        />
      </div>
      <button className="input-search-city__btn-search" onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

export default InputSearchCity
