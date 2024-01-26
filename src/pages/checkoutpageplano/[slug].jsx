import api from '@/services/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Loading } from '@/components'
import { WhatsAppOutlined } from '@ant-design/icons'
import StepPlanos from './_StepPlanos'
import StepCadastro from './_StepCadastro'
import StepPagamento from './_StepPagamento'
import apiPacto from '@/services/apiPacto'

const dataCheckoutState = {
  selected: null,
  plano: null,
  nome: null,
  cpf: null,
  data_nascimento: null,
  email: null,
  telefone: null,
  cep: null,
  endereco: null,
  numero: null,
  bairro: null,
  token: null
}

const steps = {
  0: StepPlanos,
  1: StepCadastro,
  2: StepPagamento
}

export default function Checkout() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [unidade, setUnidade] = useState({})
  const [step, setStep] = useState(0)
  const [planoLoading, setPlanoLoading] = useState(false)
  const [dataCheckout, setDataCheckout] = useState(dataCheckoutState)

  const { slug, pl: customPlan } = router.query

  useEffect(() => {
    setDataCheckout({ ...dataCheckoutState, ...router.query })
  }, [router])

  useEffect(() => {
    if (slug) {
      setLoading(true)
      api.get('/getUnidade', { params: { slug } }).then(res => {
        setUnidade(res.data.attributes)
        apiPacto.post(`/vendas/${res.data.attributes.chave}/tkn/${process.env.API_KEY_PACTO}`).then(({ data }) => {
          setDataCheckout(prevState => {
            return {
              ...prevState,
              token: data.return
            }
          })
        })
        setLoading(false)
      })
    }
  }, [slug])

  const Page = steps[step]

  return loading ? (
    <Loading style={{ height: 500 }} />
  ) : (
    <div>
      <a
        href="https://api.whatsapp.com/send?phone=553141411962&text=Estou%20no%20site%2C%20na%20p%C3%A1gina%20de%20compra%20e%20tenho%20d%C3%BAvidas "
        className="float-button"
        target="_blank"
      >
        <WhatsAppOutlined className="float-icon" />
      </a>
      <Page
        step={step}
        unidade={unidade}
        setStep={setStep}
        dataCheckout={dataCheckout}
        setDataCheckout={setDataCheckout}
        planoLoading={planoLoading}
        setPlanoLoading={setPlanoLoading}
        customPlan={customPlan ? customPlan : null}
      />
    </div>
  )
}
