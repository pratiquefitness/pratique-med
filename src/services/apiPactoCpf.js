import axios from 'axios'

const apiPactoCpf = axios.create({
  baseURL: `https://app.pactosolucoes.com.br/api/prest`
})
export default apiPactoCpf
