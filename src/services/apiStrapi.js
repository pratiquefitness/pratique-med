import axios from 'axios'

const apiStrapi = axios.create({
  baseURL: `${process.env.STRAPI_URL}/api`,
  headers: {
    Authorization: `bearer ${process.env.STRAPI_TOKEN}`
  }
})

export default apiStrapi
