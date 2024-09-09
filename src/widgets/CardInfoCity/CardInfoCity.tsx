import './CardInfoCity.css'

const CardInfoCity = () => {
  return (
    <div className="card-info-city">
      <p className="card-info-city__name">Pushcino, 4°C</p>
      <div className="card-info-city__info">
        <p className="card-info-city__info__pm">PM 10: 132</p>
        <p className="card-info-city__info__wind">Wind: 1m/c</p>
      </div>
      <div className="card-info-city__btn-remove">
        <span>×</span>
      </div>
    </div>
  )
}

export default CardInfoCity
