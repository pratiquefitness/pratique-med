import axios from 'axios'

const apiPacto = axios.create({
  baseURL: `https://app.pactosolucoes.com.br/api/prest/v2`
})
export default apiPacto
