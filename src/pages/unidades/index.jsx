import { CardUnidade, Loading } from '@/components'
import api from '@/services/api'
import utils from '@/utils'
import { Col, Input, Row, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { WhatsAppOutlined } from '@ant-design/icons'
const { Title } = Typography

const yourLocation = '🌐 Sua Localização'

export default function Home() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [unidades, setUnidades] = useState([])
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' })

  useEffect(() => {
    utils.getUserLocation(setUserLocation)
  }, [])

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      setSearch(yourLocation)
    }
  }, [userLocation])

  useEffect(() => {
    setLoading(true)
    api.get('/getUnidades', { params: userLocation }).then(res => {
      setUnidades(res.data)
      setLoading(false)
    })
  }, [userLocation])

  const data = search && search !== yourLocation ? utils.wildCardSearchAttributes(unidades, search) : unidades

  return (
    <>
      <div className="container">
        <a
          href="https://api.whatsapp.com/send?phone=553141411962&text=Estou%20no%20site%2C%20na%20p%C3%A1gina%20geral%20de%20unidades%20e%20tenho%20d%C3%BAvidas"
          className="float-button"
          target="_blank"
        >
          <WhatsAppOutlined className="float-icon" />
        </a>
        <Space direction="vertical" className="w-100" size="middle">
          <Row gutter={8}>
            <Col span={24} className="pt-3">
              <Input.Search
                placeholder="Digite seu estado, cidade ou bairro..."
                onChange={e => (search === yourLocation ? setSearch('') : setSearch(e.target.value))}
                value={search}
              />
            </Col>
          </Row>
          {loading ? (
            <Loading style={{ height: 500 }} />
          ) : (
            <Row gutter={8}>
              {/* <Col span={6}>
                <Title level={4}>Filtros</Title>
                <Input placeholder="Digite seu estado, cidade ou bairro..." />
              </Col> */}
              <Col span={24}>
                <Title level={4}>Unidades</Title>
                <Row gutter={[16, 16]}>
                  {data.map((unidade, key) => {
                    return unidade.attributes.slug !== 'pratique-em-casa' ? (
                      <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} key={key}>
                        <CardUnidade
                          slug={unidade.attributes.slug}
                          title={unidade.attributes.titulo}
                          address={unidade.attributes.endereco}
                          distance={unidade?.distance || false}
                          price={unidade.attributes.a_partir_de}
                          image={
                            unidade.attributes.foto_destaque.data
                              ? unidade.attributes.foto_destaque.data?.attributes?.url
                              : null
                          }
                        />
                      </Col>
                    ) : null
                  })}
                </Row>
              </Col>
            </Row>
          )}
        </Space>
      </div>
    </>
  )
}
