import { ChangeEvent, useMemo, useState } from 'react'
import './InputSearchCity.css'
import ruCities from '../../../entities/russiaCities/lib/ru_cities.json'
import { CityInfo } from '../../../entities/russiaCities/models/interfaces'
import { ClickAwayListener, highlightText } from '../../../shared'
interface InputSearchCityProps {
  onChangeSearchCity(name: string): void
  isLoading: boolean
}

const ID_INPUT_SEARCH_CITY = 'search_city'

const InputSearchCity = ({
  onChangeSearchCity,
  isLoading,
}: InputSearchCityProps) => {
  const [textSearch, setTextSearch] = useState<string>('')
  const [showClearButton, setShowClearButton] = useState<boolean>(false)
  const [showSuggest, setShowSuggest] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSearch = () => {
    onChangeSearchCity(textSearch)
    if (!textSearch && !errorMessage) {
      setErrorMessage('Please enter the name city')
      return
    }

    if (textSearch && errorMessage) {
      setErrorMessage('')
    }
  }

  const handleOutsideClick = (elClick: HTMLElement) => {
    if (elClick?.id !== ID_INPUT_SEARCH_CITY) {
      setShowSuggest(false)
    }
  }

  const onClearTextSearch = () => {
    setShowClearButton(false)
    setTextSearch('')
  }

  const onClickItemSuggest = (name: string) => {
    setShowSuggest(false)
    setTextSearch(name)
    onChangeSearchCity(name)
    setShowClearButton(true)
    setErrorMessage('')
  }

  const listCitySuggest = useMemo(() => {
    return ruCities.filter(ruCity =>
      ruCity.city.toLowerCase().includes(textSearch.toLowerCase())
    )
  }, [textSearch])

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
          id={ID_INPUT_SEARCH_CITY}
          type="text"
          value={textSearch}
          onClick={() => setShowSuggest(true)}
          placeholder="Search by city name in Russia"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const valueInput = e.target.value
            setTextSearch(valueInput)
            if (valueInput && errorMessage) {
              setErrorMessage('')
            }
            if (valueInput && !showClearButton) {
              setShowClearButton(true)
              return
            }
            if (!valueInput && showClearButton) {
              setShowClearButton(false)
              return
            }
          }}
        />
        {errorMessage && (
          <p className="input-search-city__input__error">{errorMessage}</p>
        )}
        {showSuggest && !!listCitySuggest.length && (
          <ClickAwayListener
            onClickOutside={handleOutsideClick}
            className="input-search-city__input__suggest"
          >
            {listCitySuggest.map((city: CityInfo) => {
              return (
                <div
                  key={city.admin_name + city.city}
                  className="input-search-city__input__suggest__item"
                  onClick={() => onClickItemSuggest(city.city)}
                >
                  {highlightText(city.city, textSearch)}
                </div>
              )
            })}
          </ClickAwayListener>
        )}
      </div>
      <button
        className="input-search-city__btn-search"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? 'Search...' : 'Search'}
      </button>
    </div>
  )
}

export default InputSearchCity
