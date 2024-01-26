import { Loading } from '@/components'
import { PlanosNomes } from '@/configs/planos'
import utils from '@/utils'
import { ShoppingOutlined } from '@ant-design/icons'
import { Collapse, Drawer, Space } from 'antd'
import { useState } from 'react'

const parcelaMatricula = 14.7
const isencaoMatricula = 8.32

function NormalPlan({ dataCheckout }) {
  return (
    <>
      <h5>Plano Selecionado</h5>
      <h4 className="widget-plan">
        <Space>
          <ShoppingOutlined />
          {PlanosNomes[dataCheckout?.selected]}
        </Space>
      </h4>
      <div className="row">
        <div className="col-6">
          <p style={{ fontSize: 12 }}>
            <b>Primeira Parcela</b>
            <br />
            <small>Será cobrada Hoje</small>
          </p>
        </div>
        <div className="col-6 text-end">
          <h4 className="widget-plan p-2 text-end w-100">{utils.formatBRL(dataCheckout?.plano.primeiraParcela)}</h4>
        </div>
        <Collapse
          items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((parcela, key) => {
            return {
              key: key,
              label: (
                <div className="row">
                  <div className="col-6 fw-bold">
                    {parcela !== 13 ? (
                      <>
                        {parcela}
                        <sup>a</sup> Parcela
                      </>
                    ) : (
                      'Demais Parcelas'
                    )}
                  </div>
                  <div className="col-6 text-end text-primary fw-bold">
                    {parcela === 1
                      ? utils.formatBRL(dataCheckout?.plano.primeiraParcela)
                      : parcela === 13
                      ? utils.formatBRL(dataCheckout?.plano.mensalidade - isencaoMatricula)
                      : utils.formatBRL(dataCheckout?.plano.mensalidade)}
                  </div>
                </div>
              ),
              children: (
                <div className="row" style={{ width: '99%' }}>
                  <div className="col-6">Mensalidade</div>
                  <div className="col-6 text-end text-primary">
                    {utils.formatBRL(dataCheckout?.plano.mensalidade - isencaoMatricula)}
                  </div>
                  {parcela !== 13 && (
                    <>
                      <div className="col-6">{parcela !== 13 ? 'Matrícula' : 'Isenção'}</div>
                      <div className="col-6 text-end text-primary">
                        {parcela === 13 ? '' : ''}
                        {utils.formatBRL(isencaoMatricula)}
                      </div>
                    </>
                  )}
                </div>
              )
            }
          })}
          bordered={false}
          expandIconPosition="end"
          size="small"
          defaultActiveKey={['0']}
        />
      </div>
      <hr />
      <h5>Matrícula</h5>
      <p style={{ fontSize: 12 }}>Dividida por 12 meses.</p>
      <h5>Bônus</h5>
      <p style={{ fontSize: 12 }}>
        EXAME DE BIOIMPEDÂNCIA <del>R$ 99,90</del> <span className="badge text-bg-success">GRÁTIS</span>
        <br />
        SAVER CLUB <span className="badge text-bg-success">CLUBE DE DESCONTOS GRÁTIS </span>
      </p>
    </>
  )
}

function CustomPlan({ dataCheckout }) {
  return (
    <>
      <h5>Plano Selecionado</h5>
      <h4 className="widget-plan">
        <Space>
          <ShoppingOutlined />
          {dataCheckout?.plano?.nome}
        </Space>
      </h4>
      <div className="row">
        <div className="col-6">
          <p style={{ fontSize: 12 }}>
            <b>Primeira Parcela</b>
            <br />
            <small>Será cobrada Hoje</small>
          </p>
        </div>
        <div className="col-6 text-end">
          <h4 className="widget-plan p-2 text-end w-100">{utils.formatBRL(dataCheckout?.plano.primeiraParcela)}</h4>
        </div>
        <Collapse
          items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((parcela, key) => {
            return {
              key: key,
              label: (
                <div className="row">
                  <div className="col-6 fw-bold">
                    {parcela !== 13 ? (
                      <>
                        {parcela}
                        <sup>a</sup> Parcela
                      </>
                    ) : (
                      'Demais Parcelas'
                    )}
                  </div>
                  <div className="col-6 text-end text-primary fw-bold">
                    {parcela === 1
                      ? utils.formatBRL(dataCheckout?.plano.primeiraParcela)
                      : parcela === 13
                      ? utils.formatBRL(dataCheckout?.plano.mensalidade)
                      : utils.formatBRL(dataCheckout?.plano.mensalidade - isencaoMatricula)}
                  </div>
                </div>
              ),
              children: (
                <div className="row" style={{ width: '99%' }}>
                  <div className="col-6">Mensalidade</div>
                  <div className="col-6 text-end text-primary">
                    {parcela === 1
                      ? utils.formatBRL(dataCheckout?.plano.primeiraParcela)
                      : parcela === 13
                      ? utils.formatBRL(dataCheckout?.plano.mensalidade - isencaoMatricula)
                      : utils.formatBRL(dataCheckout?.plano.mensalidade)}
                  </div>
                  {parcela !== 1 && (
                    <>
                      <div className="col-6">{parcela === 13 ? 'Matrícula' : 'Isenção'}</div>
                      <div className="col-6 text-end text-primary">
                        {parcela === 13 ? '' : '-'}
                        {utils.formatBRL(isencaoMatricula)}
                      </div>
                    </>
                  )}
                </div>
              )
            }
          })}
          bordered={false}
          expandIconPosition="end"
          size="small"
          defaultActiveKey={['0']}
        />
      </div>
      <hr />
      <h5>Matrícula</h5>
      <p style={{ fontSize: 12 }}>Isenta por 12 meses.</p>
      <h5>Bônus</h5>
      <p style={{ fontSize: 12 }}>
        EXAME DE BIOIMPEDÂNCIA <del>R$ 99,90</del> <span className="badge text-bg-success">GRÁTIS</span>
        <br />
        SAVER CLUB <span className="badge text-bg-success">CLUBE DE DESCONTOS GRÁTIS </span>
      </p>
    </>
  )
}

function Resume({ dataCheckout, customPlan }) {
  const attrs = { dataCheckout, customPlan }
  return customPlan ? <CustomPlan {...attrs} /> : <NormalPlan {...attrs} />
}

export default function SidebarSteps({ step, dataCheckout, planoLoading, onClickContinue, customPlan }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 d-none d-xs-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
        <div className="widget">
          <h4 className="widget-title">Resumo do seu pedido</h4>
          {planoLoading ? (
            <Loading className="py-4" />
          ) : dataCheckout?.plano ? (
            <Resume dataCheckout={dataCheckout} customPlan={customPlan} />
          ) : (
            <p>Nenhum plano selecionado</p>
          )}
        </div>
      </div>
      {dataCheckout?.plano ? (
        <div className="box-checkout-fixed d-xs-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none">
          <div className="container">
            <div className="row mt-4">
              <div className="col-6">
                <h4 className="widget-plan mb-0">
                  <Space>
                    <ShoppingOutlined style={{ fontSize: 32 }} />
                    {PlanosNomes[dataCheckout?.selected]}
                  </Space>
                </h4>
              </div>
              <div className="col-6 text-end">
                <button type="button" className="btn btn-link" onClick={() => setOpen(prev => !prev)}>
                  Detalhes da Compra
                </button>
              </div>
            </div>
            <button className="btn btn-primary btn-lg w-100 text-white my-4" onClick={onClickContinue}>
              {step === 2 ? 'Pagar Agora' : 'Continuar'}
            </button>
          </div>
          <Drawer title="Detalhes da Compra" placement="right" onClose={() => setOpen(prev => !prev)} open={open}>
            <Resume dataCheckout={dataCheckout} customPlan={customPlan} />
          </Drawer>
        </div>
      ) : null}
    </>
  )
}
