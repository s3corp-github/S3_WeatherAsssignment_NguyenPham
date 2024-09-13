import { useMemo, useRef, useState } from 'react'
import {
  DEFAULT_TEMPERATURE_FILTER,
  getWeatherCity,
  getInfoAirByLatLng,
} from '../../../shared'
import { WeatherData } from '../../../entities/infoWeather/models/interfaces'

const useWeatherCities = () => {
  const [filterTemperature, setFilterTemperature] = useState<number>(
    DEFAULT_TEMPERATURE_FILTER
  )
  const [listCities, setListCities] = useState<WeatherData[]>([])
  const [message, setMessage] = useState<string>('')
  const refListBlockCallApi = useRef<
    {
      nameSys: string
      nameSearch: string
    }[]
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const findCityByName = async (name: string) => {
    setMessage('')
    try {
      const invalidateName = refListBlockCallApi.current.some(
        n => n.nameSearch === name
      )
      if (invalidateName) {
        setMessage('The city is already on the list!')
      }
      if (!invalidateName && !isLoading && !!name?.length) {
        setIsLoading(true)
        const res = await getWeatherCity(name)

        if (res?.coord?.lat && res?.coord?.lon) {
          const resAirInfo = await getInfoAirByLatLng(
            res?.coord?.lat,
            res?.coord?.lon
          )

          if (resAirInfo?.list[0]?.components?.pm10) {
            setListCities(prev => {
              refListBlockCallApi.current = refListBlockCallApi.current.concat({
                nameSearch: name,
                nameSys: res.name,
              })
              return [
                { ...res, pm10: resAirInfo?.list[0]?.components?.pm10 },
                ...prev,
              ]
            })
          }
        }
      }
    } catch (error) {
      setMessage((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const onRemoveCity = (city: WeatherData) => {
    setListCities(prev => prev.filter(c => c?.sys?.id !== city?.sys?.id))
    refListBlockCallApi.current = refListBlockCallApi.current.filter(
      c => c.nameSys !== city.name
    )
  }

  const listCitiesFilterTemp = useMemo(() => {
    return listCities.filter(c => c?.main?.temp >= filterTemperature)
  }, [filterTemperature, listCities])

  return {
    message,
    totalCities: listCities?.length,
    isLoading,
    listCitiesFilterTemp,
    onRemoveCity,
    findCityByName,
    setFilterTemperature,
  }
}

export default useWeatherCities
