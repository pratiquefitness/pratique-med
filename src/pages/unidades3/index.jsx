import { CardUnidade, Loading } from '@/components'
import api from '@/services/api'
import utils from '@/utils'
import { Col, Input, Row, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
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
    if (userLocation) {
      setLoading(true);
  
      try {
        api.get('https://pratique-fitness-api-production.up.railway.app/api/getUnidades', { params: userLocation }).then(res => {
          setUnidades(res.data);
        });
      } catch (error) {
        console.error('Error fetching unidades:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [userLocation]);
  

  const data = search && search !== yourLocation ? utils.wildCardSearchAttributes(unidades, search) : unidades

  return (
    <>
      <div className="container" style={{ touchAction: 'pan-y' }}>
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
                  {data.map((unidade, key) => (
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
                  ))}
                </Row>
              </Col>
            </Row>
          )}
        </Space>
      </div>
    </>
  )
}
