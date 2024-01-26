import { getDistance } from 'geolib'
import apiStrapi from '@/services/apiStrapi'

export default async function handler(req, res) {
  const { latitude, longitude } = req.query
  await apiStrapi.get('/unidades?populate=*&pagination[pageSize]=100').then(async result => {
    const dados = result.data.data
    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined' && latitude.length && longitude.length) {
      const sortedLocations = await Promise.all(
        dados.map(async unidade => ({
          ...unidade,
          distance: getDistance(
            { latitude, longitude },
            { latitude: unidade.attributes.latitude, longitude: unidade.attributes.longitude }
          )
        }))
      )
      sortedLocations.sort((a, b) => a.distance - b.distance)

      res.status(200).json(sortedLocations)
    } else {
      res.status(200).json(dados)
    }
  })
}
