import { data, getCodeOfPlan, getValueOfPlan, planos } from '@/configs/planos'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { Alert, Collapse } from 'antd'
import SidebarSteps from './_SidebarSteps'
import { useEffect, useState } from 'react'
import utils from '@/utils'
import apiPacto from '@/services/apiPacto'
import Footer from './_Footer'
import { useRouter } from 'next/router'

export default function StepPlanos({
  step,
  unidade,
  setStep,
  dataCheckout,
  setDataCheckout,
  planoLoading,
  setPlanoLoading,
  customPlan
}) {
  const [error, setError] = useState(false)
  const [adicional, setAdicional] = useState(dataCheckout?.selected === 'plano_combo_plus')

  useEffect(() => {
    if (dataCheckout.selected) {
      onChangePlano({
        target: {
          value: dataCheckout.selected
        }
      })
    }

    if (customPlan) {
      getCustomPlan(customPlan)
    }
  }, [])

  const getCustomPlan = customPlan => {
    setPlanoLoading(true)
    setDataCheckout(prev => {
      return { ...prev, selected: 'customPlan' }
    })
    apiPacto.get(`/vendas/${unidade.chave}/planos/${unidade.Separador}`).then(res => {
      const selectedPlano = utils.getByObjectKeyValue(res.data.return, 'codigo', parseInt(customPlan))
      setDataCheckout(prev => {
        return { ...prev, plano: selectedPlano }
      })
      setPlanoLoading(false)
    })
  }

  const onChangePlano = e => {
    setPlanoLoading(true)
    const plano = e.target.value
    console.log(plano)
    setDataCheckout(prev => {
      return { ...prev, selected: plano }
    })
    apiPacto.get(`/vendas/${unidade.chave}/planos/${unidade.Separador}`).then(res => {
      const selectedPlano = utils.getByObjectKeyValue(
        res.data.return,
        'codigo',
        parseInt(getCodeOfPlan(unidade[plano]))
      )
      setDataCheckout(prev => {
        return { ...prev, plano: selectedPlano }
      })
      setPlanoLoading(false)
    })
  }

  const onClickContinue = () => {
    if (dataCheckout.selected) {
      setStep(1)
    } else {
      setError(true)
    }
  }

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
            <h3 className="mb-4">Escolha a assinatura que tornará sua vida mais feliz e saudável:</h3>
            {error && <Alert message="Selecione um plano." type="error" className="mb-3" showIcon />}

            {customPlan ? (
              <div className={`box-plan ${'customPlan' === dataCheckout.selected ? 'selected' : ''}`}>
                <div className="row">
                  <div className="col-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={'customPlan'}
                        id={'customPlan'}
                        checked={'customPlan' === dataCheckout.selected}
                      />
                      <label className="form-check-label" htmlFor={'customPlan'}>
                        {dataCheckout?.plano?.nome}
                      </label>
                    </div>
                  </div>
                  <div className="col-5 text-center">
                    <p className="title">Fidelidade</p>
                    <p className="value">Sem Fidelidade</p>
                  </div>
                  <div className="col-3 text-center">
                    <p className="title">Valor</p>
                    <p className="value">{utils.formatBRL(dataCheckout?.plano?.primeiraParcela || 0)}</p>
                  </div>
                </div>
              </div>
            ) : (
              planos.map((plano, key) => {
                const planoExist = !!unidade?.[plano]
                //const dados = data(unidade).filter(item => item[plano])
                return planoExist && plano === 'plano_plus' ? (
                  <>
                    <div className={`box-plan ${plano === dataCheckout.selected ? 'selected' : ''}`} key={key}>
                      <div className="row">
                        <div className="col-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={plano}
                              id={plano}
                              checked={true}
                              onChange={onChangePlano}
                            />
                            <label className="form-check-label" htmlFor={plano}>
                              <img src={`/planos/${plano.replace('plano_', '')}.png`} alt={plano} height="22" />
                            </label>
                          </div>
                        </div>
                        <div className="col-5 text-center">
                          <p className="title">Fidelidade</p>
                          <p className="value">Sem Fidelidade</p>
                        </div>
                        <div className="col-3 text-center">
                          <p className="title">Valor</p>
                          <p className="value">R$ {getValueOfPlan(unidade[plano])}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`box-plan ${plano === adicional ? 'selected' : ''}`} key={key}>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={'plano_combo_plus'}
                              id={'plano_combo_plus'}
                              checked={adicional}
                              onChange={() => {
                                setAdicional(!adicional)
                                onChangePlano({
                                  target: {
                                    value: adicional ? 'plano_plus' : 'plano_combo_plus'
                                  }
                                })
                              }}
                            />
                            <p className="value text-success d-flex" style={{ justifyContent: 'space-between' }}>
                              + Adicionar combo nutri por 19,90 /mês.
                            </p>
                            <p className="value">
                              Consulta com nutricionista a cada 45 dias. De <s>89,90</s> por 19,90 por mes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null
              })
            )}
            <div className="text-center py-3">
              <a href="#" className="btn btn-primary btn-lg text-white mb30" onClick={onClickContinue}>
                Continuar
              </a>
            </div>
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
