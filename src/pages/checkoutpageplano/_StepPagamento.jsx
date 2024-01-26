import { Alert, Button, Card, Col, Form, Input, Modal, Row } from 'antd'
import { useEffect, useState } from 'react'
import ReactInputMask from 'react-input-mask'
import SidebarSteps from './_SidebarSteps'
import utils from '@/utils'
import apiViaCep from '@/services/apiViaCep'
import Cards from 'react-credit-cards'
import valid from 'card-validator'
import { Loading } from '@/components'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { getIP, payOrder } from '@/services/actions/checkout'
import { useRouter } from 'next/router'
import { PlanosNomes } from '@/configs/planos'

const required = {
  required: true,
  message: 'Preencha este campo.'
}

export default function StepPagamento({ step, unidade, dataCheckout, planoLoading, customPlan }) {
  const [form] = Form.useForm()
  const [isVerified, setVerified] = useState()
  const [payLoading, setPayLoading] = useState(false)
  const [invalidCC, setInvalidCC] = useState(false)
  const router = useRouter()
  const isencaoMatricula = 8.32
  const [modalVisible, setModalVisible] = useState(false)

  const [values, setValues] = useState({
    cardSecurityCode: '',
    cardExpiration: '',
    focus: '',
    cardName: '',
    cardNumber: '',
    focus: ''
  })
  const numberOfQuota = dataCheckout?.plano?.maxDivisao ? dataCheckout.plano.maxDivisao : 1

  const handleCheckboxChange = () => {
    setTermosAceitos(!termosAceitos)
  }

  const [modalRef, setModalRef] = useState(null)
  const [applyDiscount, setApplyDiscount] = useState(false)
  const [termosAceitos, setTermosAceitos] = useState(false)
  const currentUrl = router.asPath
  const temParametroObs = currentUrl.includes('obs=')
  const temAfiliadoMed = currentUrl.toLowerCase().includes('afiliadomed')
  const initialCuppomValue = temAfiliadoMed ? null : 'projetovidao'
  const [cuppomValue, setCuppomValue] = useState(initialCuppomValue)

  // Fun  o para abrir o modal ao clicar no link
  const openModal = () => {
    setModalVisible(true)
  }

  // Fun  o para fechar o modal
  const closeModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    console.log('cuppomValue:', cuppomValue)
  }, [cuppomValue])

  useEffect(() => {
    form.setFieldsValue(dataCheckout)
  }, [])

  const onSubmit = () => {
    form.submit()
  }

  const verifyCallback = value => {
    setVerified(value)
  }

  const onClickPay = async values => {
    const ip = await getIP()

    const validateCreditCard = [
      valid.cardholderName(values.cardName).isValid,
      valid.number(values.cardNumber).isValid,
      valid.expirationDate(values.cardExpiration).isValid,
      valid.cvv(values.cardSecurityCode).isValid
    ]

    if (!validateCreditCard.includes(false)) {
      setPayLoading(true)
      const payData = {
        ...dataCheckout,
        ...values,
        unidade,
        isVerified,
        ip,
        numberOfQuota
      }

      const payResponse = await payOrder(payData)

      if (payResponse) {
        const currentUrl = router.asPath
        const matchUrl = currentUrl.match(/obs=([^|]+)/)
        const obsValue = matchUrl ? matchUrl[1] : null

        if (obsValue === 'DIRETONUTRI' && typeof window !== 'undefined') {
          window.location.href = 'https://pratiquefitness.com.br/compra-realizada-nutri/'
          return
        }
        if (obsValue === 'DIRETOBIKE' && typeof window !== 'undefined') {
          window.location.href = 'https://pratiquefitness.com.br/compra-realizada-bike/'
          return
        }
        if (typeof window !== 'undefined') {
          window.location.href = 'https://pratiquefitness.com.br/compra-realizada-plano/'
        }
      } else {
        setInvalidCC(true)
        setPayLoading(false)
      }
      setPayLoading(false)
    } else {
      setInvalidCC(true)
    }
  }

  const onChangeCep = event => {
    const value = event.target.value
    const clearMaskValue = utils.stringOnlyNumbers(value)
    if (clearMaskValue.length === 8) {
      apiViaCep.get(`${clearMaskValue}/json`).then(({ data }) => {
        if (!data?.erro) {
          form.setFieldsValue({
            endereco: data.logradouro,
            bairro: data.bairro
          })
        }
      })
    }
  }

  const alertStyle = {
    backgroundColor: '#438105',
    marginTop: '5px'
  }
  const alertStyleRed = {
    border: '3px solid #ed143d',
    backgroundColor: '#e9ebef'
  }

  const handleChangeCard = e => {
    const { name, value } = e.target

    if (name === 'telefone') {
      const cleanedValue = value.replace(/[\s-]/g, '')
      form.setFieldsValue({ [name]: cleanedValue })
    }

    setValues(prevValues => ({
      ...prevValues,
      [name]: utils.removeUnderlines(value),
      focus: e.target.name === 'cardSecurityCode' ? 'cvc' : e.target.name
    }))
  }

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <iframe
              width="100%"
              height="250"
              src="https://www.youtube.com/embed/XgUmv9QMi4A"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            <Alert
              style={alertStyleRed}
              type="success"
              message={
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#e9ebef',
                    color: '#ed143d',
                    fontWeight: 'bold',
                    marginBottom: '7px',
                    textAlign: 'center'
                  }}
                >
                  <span
                    style={{
                      fontSize: '20px',
                      marginBottom: '-10px',
                      lineHeight: '2'
                    }}
                  >
                    {PlanosNomes[dataCheckout?.selected]}
                  </span>
                  <span style={{ lineHeight: '2' }}>
                    1ª Parcela{' '}
                    {dataCheckout?.plano?.primeiraParcela ? utils.formatBRL(dataCheckout.plano.primeiraParcela) : ''}
                    <span style={{ color: '#438105' }}> *</span>
                  </span>
                  <span style={{ lineHeight: '1.2' }}>
                    {' '}
                    <span style={{ color: '#438105' }}>*</span> Matrícula | Saver Club R$ 8,32
                  </span>
                  <span
                    style={{
                      lineHeight: '1.2',
                      color: 'black',
                      fontWeight: 'bold'
                    }}
                  >
                    {' '}
                    NÃO OCUPA O LIMITE DE SEU CARTÃO
                  </span>
                  {/* <span style={{ lineHeight: '2' }}>Demais Parcelas {mensalidadeFormatada} + R$ 8,32</span> */}
                </div>
              }
            />

            {initialCuppomValue !== null && (
              <Alert
                style={alertStyle}
                className="fundoverde"
                type="success"
                message={
                  <div
                    className="fonteverde"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      marginBottom: '7px',
                      textAlign: 'center'
                    }}
                  >
                    {' '}
                    <span style={{ fontSize: '25px', marginBottom: '-10px' }}>🎫 R$ 50</span>
                    <span style={{ lineHeight: '1.2' }}>de DESCONTO aplicado!</span>
                    <span style={{ fontSize: '15px' }}>
                      1 Parcela{' '}
                      <span style={{ fontSize: '25px' }}>
                        {dataCheckout?.plano?.primeiraParcela !== null &&
                        dataCheckout?.plano?.primeiraParcela !== undefined
                          ? utils.formatBRL(dataCheckout?.plano?.primeiraParcela - 50)
                          : ''}
                      </span>
                    </span>
                  </div>
                }
              />
            )}

            <Form onFinish={onClickPay} form={form} style={{ margin: '5px' }}>
              <Form.Item name="nome" rules={[required]}>
                <Input placeholder="Nome Completo" />
              </Form.Item>
              <Form.Item name="cpf" rules={[required]}>
                <ReactInputMask mask="999.999.999-99">
                  {inputProps => <Input placeholder="Seu CPF" {...inputProps} />}
                </ReactInputMask>
              </Form.Item>
              {temAfiliadoMed && (
                <Form.Item name="data_nascimento">
                  <ReactInputMask mask="99/99/9999">
                    {inputProps => <Input placeholder="Data de Nascimento" {...inputProps} />}
                  </ReactInputMask>
                </Form.Item>
              )}
              {!temAfiliadoMed && (
                <Form.Item name="data_nascimento" initialValue={null} noStyle>
                  <Input type="hidden" />
                </Form.Item>
              )}
              <Form.Item name="email" rules={[required]}>
                <Input placeholder="Seu e-mail principal" />
              </Form.Item>
              <Form.Item name="cuppom" initialValue={cuppomValue}>
                <Input placeholder="Cuppom" />
              </Form.Item>
              <Form.Item name="telefone" rules={[required]}>
                <ReactInputMask mask="(99) 99999-9999">
                  {inputProps => <Input placeholder="Seu telefone (WhatsApp)" {...inputProps} />}
                </ReactInputMask>
              </Form.Item>
              <Card title="Pagamento" className="mb-4">
                <div className="credit-card">
                  <Cards
                    cvc={values.cardSecurityCode}
                    expiry={values.cardExpiration}
                    focused={values.focus}
                    name={values.cardName}
                    number={values.cardNumber}
                    placeholders={{ name: 'SEU NOME AQUI' }}
                    locale={{ valid: 'validade' }}
                  />
                </div>
                <Form.Item name="cardName" rules={[required]}>
                  <Input name="cardName" placeholder="Nome impresso no cartão" onChange={handleChangeCard} />
                </Form.Item>
                <Form.Item name="cardNumber" rules={[required]}>
                  <ReactInputMask name="cardNumber" mask="9999 9999 9999 9999" onChange={handleChangeCard}>
                    {inputProps => <Input placeholder="Número do cartão" {...inputProps} />}
                  </ReactInputMask>
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="cardExpiration" rules={[required]}>
                      <ReactInputMask name="cardExpiration" mask="99/99" onChange={handleChangeCard}>
                        {inputProps => <Input placeholder="Validade" {...inputProps} />}
                      </ReactInputMask>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="cardSecurityCode" rules={[required]}>
                      <ReactInputMask name="cardSecurityCode" mask="999" onChange={handleChangeCard}>
                        {inputProps => <Input placeholder="Cód. Seguran a" {...inputProps} />}
                      </ReactInputMask>
                    </Form.Item>
                  </Col>
                </Row>
                {invalidCC && <Alert type="error" message="Erro ao realizar seu pagamento." showIcon />}
              </Card>
              <p className="text-center" style={{ fontSize: 12 }}>
                <GoogleReCaptcha onVerify={verifyCallback} />
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  style={{
                    boxShadow: '0px 0px 20px red',
                    padding: '8px',
                    borderRadius: '5px',
                    marginRight: '10px',
                    animation: termosAceitos ? 'blink 1s infinite' : 'none'
                  }}
                />
                Li e aceito os termos de uso, regras de utiliza o e política de privacidade
                <br />
                <a href="#" onClick={openModal}>
                  Clique aqui para ler
                </a>
              </p>
              <div className="text-center py-3">
                <Button type="primary" htmlType="submit">
                  Pagar Agora
                </Button>
              </div>{' '}
              <Modal
                title="Regulamento"
                visible={modalVisible}
                onCancel={closeModal}
                footer={[
                  <Button key="fechar" onClick={closeModal}>
                    Fechar
                  </Button>
                ]}
              >
                {' '}
                <div style={{ textAlign: 'justify' }}>
                  {/* Texto do regulamento */}
                  <p>
                    O acesso Academia feito através do reconhecimento facial ou biometria, caso encontre dificuldade
                    favor procurar o recepcionista.{' '}
                  </p>
                  <p>
                    Treine sempre com roupas adequadas: tênis, short, camiseta. Traga garrafinha para beber água e
                    toalhinha para secar o suor. É extremamente proibido treinar usando jeans, sem calçado adequado ou
                    sem camisa.
                  </p>
                  <p>
                    {' '}
                    A Academia é um ambiente coletivo, e existe armário rotativo á disposição para a guarda de
                    pertences. Para utiliza o dos armários é necess rio que o aluno leve cadeado com funcionamento
                    adequado para realizar o seu fechamento, vedado o uso de arm rio sem utiliza o de cadeado
                    particular.
                  </p>
                  <p> O treino do aluno estar dispon vel para acesso no APP em at 48 horas após avaliação física.</p>
                  <p>
                    {' '}
                    O atendimento coletivo, os professores estão á disposição dos alunos, basta acioná-los. No salão de
                    musculação, utilize o botão de atendimento para ser atendido mais rapidamente.
                  </p>
                  <p>
                    {' '}
                    O aluno deve utilizar os equipamentos da academia de forma adequada e de acordo com as orientações
                    dos profissionais da academia, e, em acordo com as imagens ilustrativas dispon veis em aplicativo de
                    treinos, fixadas nos equipamentos, devendo realizar ainda a fixa o de anilhas e partes móveis de
                    equipamentos com presilhas disponíveis, tomando ainda cuidado com demais alunos quando da execução
                    de qualquer exercício, guardando distância de seguran a para execu o de exerc cios, e prestando
                    atenção durante toda a sua estadia na academia.
                  </p>
                  <p> Todos os alunos são responsáveis por guardar halteres, barras e anilhas ap s utilizá-los.</p>
                  <p>
                    {' '}
                    Academia Pratique Fitness se reserva no direito de fazer qualquer tipo de alteração, quando entender
                    necessário, em horários, dias de aulas e quadro de professores. Tanto nas turmas de atividades
                    aquáticas (hidroginástica, natação e outros), quanto em qualquer turma de aulas coletivas (Pratique
                    Dance, Jump, Spinning e outros), caso a altera o se d em hor rios, dias de aulas, a mesma ir ocorrer
                    com aviso pr vio de 30 dias, e caso a altera o impossibilite a frequência do aluno matriculado, este
                    poderão cancelar o plano sem qualquer ônus dentro do prazo de aviso.
                  </p>
                  <p>
                    {' '}
                    A Academia Pratique Fitness se resguarda ao direito de fazer contato via mensagens, e-mails e
                    telefones cadastrados para quaisquer situações, sendo ela promocional, cobranças, eventos e datas de
                    funcionamento especiais.
                  </p>
                  <p>
                    {' '}
                    Artes Marciais não inclusas na Venda Online nas Unidades Guarani e Heliópolis. Na constatação de
                    serviços e Pagamento realizado e pelo site pelo site serão feito no cartão de crédito na modalidade
                    recorrente. Os planos não dão direito matrícula de atividades aquáticas, pilates, personal class,
                    taekwondo e muay thai (Guarani e Heliópolis).
                  </p>
                  <p>
                    {' '}
                    A matr cula Fit garante acesso a todas as aulas coletivas e muscula o, exceto atividades aquáticas,
                    pilates, Personal Class, taekwondo e muay thai (Guarani e Heliópolis).
                  </p>
                  <p>
                    {' '}
                    A taxa de Matrícula de R$ 99,00 é obrigatória para todo o plano recorrente contratado, que ser
                    dividida em 2 pagamentos que ser o cobrados no 2º (segundo) e 3º (terceiro) m s de vigência do
                    plano.
                  </p>
                  <p>
                    {' '}
                    A matrícula Premium garante acesso musculação e a todas as aulas coletivas em todas as unidades,
                    exceto atividades aqu ticas, pilates, Personal Class, taekwondo e muay thai (Guarani e Heliópolis)
                    nas unidades da Rede.
                  </p>
                  <p>
                    {' '}
                    Regra da promoção Premium: Não poder migrar de matrícula para outro durante 6 meses. *A taxa de matr
                    cula será cobrada no segundo e terceiro mês da de vigência da matrícula.
                  </p>
                  <p>
                    {' '}
                    Não permitida a permanência de crianças ou adultos no interior da Academia fora do horário de
                    treinos ou aulas que não estejam matriculados.
                  </p>
                  <p>
                    {' '}
                    É terminantemente proibida entrada ou permanência de animais de estimação de qualquer espécie e sob
                    qualquer condições nos ambientes da academia.
                  </p>
                  <p>
                    {' '}
                    Na aquisição de qualquer plano promocional com desconto fidelidade, o aluno poderá fazer apenas uma
                    transferência para outro titular. Este terá que arcar com os custos da avaliação física e matrícula.
                  </p>
                  <p>
                    {' '}
                    O cancelamento de qualquer plano deve ser feito através do preenchimento correto e assinatura do
                    FORMUL RIO DE CANCELAMENTO.
                  </p>
                  <p>
                    {' '}
                    Cancelamento do plano anual parcelado (faturado): Em caso de cancelamento de plano anual com valor
                    total exigido quando da contratação do pacote, de forma antecipada, haverá incidência de multa de
                    20% (vinte por cento), incidente sobre o valor remanescente do plano contratado (sobre o valor não
                    utilizado).
                  </p>
                  <p>
                    {' '}
                    Cancelamento de plano por assinatura recorrente: o cancelamento não terá multa, o pedido de
                    cancelamento dever ser feito atravês do preenchimento correto e assinatura do FORMULÁRIO DE
                    CANCELAMENTO, pelo próprio titular do contrato. Caso o aluno ainda n o tenha pago a Matrícula do
                    plano recorrente, a mesma será cobrada no ato do cancelamento, de forma integral, no valor de
                    R$99,90.
                  </p>
                  <p> Nenhum plano possui férias ou trancamentos.</p>
                  <p>
                    {' '}
                    Em caso de cancelamento, ser cobrada a taxa de matrícula no valor de 99,90 reais caso não tenha sido
                    quitada. Matr cula recorrente, NÃO TEM MULTA, quitado o valor de matr cula as mensalidades ser o
                    suspensas no momento do pedido de cancelamento, restando a utilização o da mensalidade vigente até o
                    encerramento do mês contratado.
                  </p>
                  <p>
                    {' '}
                    Caso não tenha pago a taxa de matrícula recorrente, a mesma será cobrada no ato do cancelamento, de
                    forma integral, no valor de 99,90 reais, ficando congelada a taxa de matrícula para utiliza o
                    futura.
                  </p>
                  <p> Ao fazer o pedido de cancelamento as cobranças referentes ás mensalidades estar o suspensas.</p>
                </div>
              </Modal>
            </Form>
          </div>
          <SidebarSteps
            step={step}
            dataCheckout={dataCheckout}
            planoLoading={planoLoading}
            onClickContinue={onSubmit}
            customPlan={customPlan}
          />
          <Modal open={payLoading} footer={false} closable={false} width={400} centered>
            <div className="p-4 text-center">
              <h3 className="mb-5">Realizando Pagamento</h3>
              <Loading className="p-0" />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}
