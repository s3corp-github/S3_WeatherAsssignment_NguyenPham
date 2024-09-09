import { InputSearchCity } from '../../features'
import './WeatherPage.css'

const WeatherPage = () => {
  return (
    <div className="weather">
      <div className="weather__box">
        <h1 className="weather__box__title">Weather App</h1>
        <div className="weather__box__body">
          <InputSearchCity
            onChangeSearchCity={(textSearch: string) =>
              console.log(
                '🚀 Line: 9 👈 🆚 👉 ==== n-console: textSearch',
                textSearch
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
