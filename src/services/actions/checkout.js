import axios from 'axios'
import apiPacto from '../apiPacto'
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

export const payOrder = async payData => {
  const numeroCartao = payData.cardNumber.replace(/\s+/g, '')
  const validade = payData.cardExpiration.replace('/', '/20')

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
