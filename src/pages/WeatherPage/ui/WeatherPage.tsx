import { InputSearchCity, SliderTemperature } from '../../../features'
import { MessageError } from '../../../shared'
import { CardInfoCity } from '../../../widgets'
import useWeatherCities from '../lib/useWeatherCities'
import './WeatherPage.css'

const WeatherPage = () => {
  const {
    message,
    isLoading,
    totalCities,
    listCitiesFilterTemp,
    onRemoveCity,
    findCityByName,
    setFilterTemperature,
  } = useWeatherCities()

  return (
    <div className="weather">
      <div className="weather__box">
        <h1 className="weather__box__title">Weather App</h1>
        <div className="weather__box__body">
          <div className="weather__box__body__action">
            <InputSearchCity
              isLoading={isLoading}
              onChangeSearchCity={(textSearch: string) => {
                findCityByName(textSearch)
              }}
            />
            <SliderTemperature onChangeTemperature={setFilterTemperature} />
            <div className="weather__box__body__action__message">
              <MessageError message={message} />
              <p>
                Show {listCitiesFilterTemp.length}/{totalCities} cities
              </p>
            </div>
          </div>
          <div className="weather__box__body__list">
            {!listCitiesFilterTemp?.length ? (
              <div>
                <p>No Data</p>
              </div>
            ) : (
              listCitiesFilterTemp.map(city => {
                return (
                  <CardInfoCity
                    key={city.sys.id}
                    city={city}
                    onRemoveCity={() => onRemoveCity(city)}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
