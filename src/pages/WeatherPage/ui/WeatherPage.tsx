import { InputSearchCity, SliderTemperature } from '../../../features'
import { MessageError } from '../../../shared'
import { CardInfoCity } from '../../../widgets'
import useWeatherCities from '../lib/useWeatherCities'
import './WeatherPage.css'

const WeatherPage = () => {
  const {
    isLoading,
    message,
    listCitiesFilterTemp,
    findCityByName,
    onRemoveCity,
    setFilterTemperature,
  } = useWeatherCities()
  return (
    <div className="weather">
      <div className="weather__box">
        <h1 className="weather__box__title">Weather App</h1>
        <div className="weather__box__body">
          <InputSearchCity
            isLoading={isLoading}
            onChangeSearchCity={(textSearch: string) => {
              findCityByName(textSearch)
            }}
          />
          <SliderTemperature onChangeTemperature={setFilterTemperature} />
          <MessageError message={message} />
          <div className="weather__box__body__list">
            {listCitiesFilterTemp.map(city => {
              return (
                <CardInfoCity
                  key={city.sys.id}
                  city={city}
                  onRemoveCity={() => onRemoveCity(city)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
