import axios from 'axios'

const ApiPratique = axios.create({
  baseURL: `https://pratiquefitness.com.br`
})

export default ApiPratique
