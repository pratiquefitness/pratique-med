import apiStrapi from '@/services/apiStrapi'

export default async function handler(req, res) {
  const { slug } = req.query
  await apiStrapi.get('/unidades?populate=*&pagination[pageSize]=100').then(async result => {
    const dados = result.data.data.find(item => item.attributes.slug === slug)
    res.status(200).json(dados)
  })
}
