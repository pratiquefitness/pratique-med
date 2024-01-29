import axios from 'axios'

const ApiPratique = axios.create({
  baseURL: `https://med.pratiquefitness.com.br`
})

export default ApiPratique
