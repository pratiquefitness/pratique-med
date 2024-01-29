import { Button, Form, Input } from 'antd'
import SidebarSteps from './_SidebarSteps'
import Footer from './_Footer'
import ReactInputMask from 'react-input-mask'
import ApiPratique from '@/services/ApiPratique'

const required = {
  required: true,
  message: 'Preencha este campo.'
}

const phoneMask = '(99) 99999-9999'

const phoneValidator = (rule, value) => {
  if (!value || value.replace(/\D/g, '').length !== 11) {
    return Promise.reject('Digite um número de telefone válido')
  }
  return Promise.resolve()
}

export default function StepCadastro({
  step,
  unidade,
  setStep,
  setDataCheckout,
  dataCheckout,
  planoLoading,
  customPlan
}) {
  const [form] = Form.useForm()

  const onFinishForm = values => {
    setDataCheckout(prev => {
      return { ...prev, ...values }
    })
    //ApiPratique.post('/pagamento/checkoutpageplano/api/lead.php', { ...dataCheckout, ...values, unidade })
    setStep(2)
  }

  const onClickContinue = () => {
    form.submit()
  }

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h6 className="mb-4">Agora, preencha estes campos de cadastro na Pratique Med:</h6>
            <Form onFinish={onFinishForm} form={form}>
              <Form.Item name="nome" rules={[required]}>
                <Input placeholder="Nome Completo" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  required,
                  {
                    type: 'email',
                    message: 'Digite um e-mail válido'
                  }
                ]}
              >
                <Input placeholder="Seu e-mail principal" />
              </Form.Item>
              <Form.Item name="telefone" rules={[required, { validator: phoneValidator }]}>
                <ReactInputMask mask={phoneMask}>
                  {inputProps => <Input placeholder="Seu telefone (WhatsApp)" {...inputProps} />}
                </ReactInputMask>
              </Form.Item>
              <div className="text-center py-3">
                <Button type="primary" htmlType="submit">
                  Continuar Cadastro
                </Button>
              </div>
              <p className="text-center" style={{ fontSize: 12 }}>
                Utilizamos seus dados pessoais para o cadastro em nossa plataforma, que nos permite lhe prestar nossos
                serviços. Para mais informações, acesse nosso Aviso de Privacidade. Caso não queira receber comunicações
                de marketing, o descadastramento pode ser realizado pelo Portal de Privacidade ou pelo link
                disponibilizado no rodapé dos e-mails da Pratique. Importante: apenas comunicações de Marketing podem
                ser desativadas. O envio de informações sobre seus planos e/ou sobre sua Pratique continuarão a ser
                encaminhados, pois são essenciais para prestação de serviços.
              </p>
            </Form>
            <Footer />
          </div>
          <SidebarSteps
            step={step}
            dataCheckout={dataCheckout}
            planoLoading={planoLoading}
            onClickContinue={onClickContinue}
            customPlan={customPlan}
          />
        </div>
      </div>
    </div>
  )
}
