import axios from 'axios'

const ApiPratique = axios.create({
  baseURL: `https://pagamento.pratiquemed.com.br/`
})

export default ApiPratique
