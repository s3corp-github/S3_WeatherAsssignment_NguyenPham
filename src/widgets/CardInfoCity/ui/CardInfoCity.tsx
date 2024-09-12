import { WeatherData } from '../../../entities/infoWeather/models/interfaces'
import './CardInfoCity.css'

interface CardInfoCityProps {
  city: WeatherData
  onRemoveCity(): void
}
const CardInfoCity = ({ city, onRemoveCity }: CardInfoCityProps) => {
  return (
    <div className="card-info-city">
      <p className="card-info-city__name">
        {city?.name}, {city?.main?.temp}°C
      </p>
      <div className="card-info-city__info">
        <p className="card-info-city__info__pm">
          PM 10: {city?.wind?.deg} µg/m³
        </p>
        <p className="card-info-city__info__wind">
          Wind: {city?.wind?.speed} m/s
        </p>
      </div>
      <div className="card-info-city__btn-remove" onClick={onRemoveCity}>
        <span>×</span>
      </div>
    </div>
  )
}

export default CardInfoCity
