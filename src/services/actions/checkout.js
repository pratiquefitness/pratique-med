import axios from 'axios'
import apiPacto from '../apiPacto'
import apiPactoCpf from '../apiPactoCpf'
import api from '../api'
import ApiPratique from '../ApiPratique'

export const getIP = async () => {
  const response = await axios.get('https://api.ipify.org/?format=json')
  return response?.data?.ip || null
}

export const checkRecaptchaSecret = async (isVerified, ip) => {
  const response = await api.post('/checkRecaptchaSecret', { isVerified, ip })
  return response?.data?.success || 0
}

export const consultarClienteApi = async (unidade, cpf, email) => {
  const unidadeFinal = unidade.chave
  const apiUrl = `/cliente/${unidadeFinal}/consultarClienteJson?cpf=${cpf}&email=${email}`

  try {
    const response = await apiPactoCpf.post(apiUrl, {})
    //console.log('Resposta da API:', response.data)
    return response.data
  } catch (error) {
    // console.error('Erro na consulta do cliente:', error)
    throw error
  }
}

export const payOrder = async payData => {
  const numeroCartao = payData.cardNumber.replace(/\s+/g, '')
  const validade = payData.cardExpiration.replace('/', '/20')
  console.log('Resposta da API:', numeroCartao, validade, payData.unidade.chave, payData.token)
  const response = await apiPacto.post(`/vendas/${payData.unidade.chave}/alunovendaapp/${payData.token}`, {
    unidade: payData.unidade.Separador,
    plano: payData.plano.codigo,
    nome: payData.nome,
    email: payData.email,
    numeroCupomDesconto: payData.cuppom,
    telefone: payData.telefone,
    dataNascimento: payData.data_nascimento,
    cpf: payData.cpf,
    ipPublico: payData.ip,
    nomeCartao: payData.cardName,
    numeroCartao: numeroCartao,
    validade: validade,
    cvv: payData.cardSecurityCode,
    cobrarParcelasEmAberto: true,
    nrVezesDividir: payData.numberOfQuota
  })

  if (response.data.return === 'APROVADA') {
    await ApiPratique.get('pagamento/checkoutpageplano/api/salvarafiliado.php', {
      params: {
        obs: payData.obs,
        cpf: payData.cpf,
        email: payData.email
      }
    })
    return true
  } else {
    return false
  }
}
