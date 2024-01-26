import api from '@/services/api'
import { Table } from 'antd'
import { data, columns, planos, columnUniquePlan } from '@/configs/planos'
import SectionPrime from './_SectionPrime'
import SectionNatacao from './_SectionNatacao'
import CarouselFotos from './_CarouselFotos'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Loading } from '@/components'
import Link from 'next/link'
import utils from '@/utils'

export default function Unidade() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [unidade, setUnidade] = useState({})

  const { slug } = router.query

  useEffect(() => {
    if (slug) {
      setLoading(true);
      api.get(`http://localhost:3333/unidades/${slug}`).then(res => {
        setUnidade(res.data.attributes);
        setLoading(false);
      }).catch(error => {
        console.error('Error fetching unidade details:', error);
        setLoading(false);
      });
    }
  }, [slug]);
  

  return loading ? (
    <Loading style={{ height: 500 }} />
  ) : (
    <>
      <div className="container py-5" style={{ touchAction: 'pan-y', width: '80%' }} id="table">
        <div className="row">
          <div className="col-md-12">
            <h6 className="text-uppercase text-center">NÃO PERCA MAIS TEMPO</h6>
            <h2 className="py-2 text-uppercase fw-bold text-center">FAÇA SUA MATRÍCULA ON-LINE</h2>
            <div className="d-none d-sm-none d-md-block d-lg-block d-xl-block">
              <Table
                dataSource={data(unidade)}
                columns={columns(unidade)}
                pagination={false}
                id="table-planos"
                rowKey="key"
              />
            </div>
            <div className="d-sm-block d-md-none d-lg-none d-xl-none">
              {planos.map((plano, key) => {
                const planoExist = !!unidade[plano]
                return planoExist ? (
                  <div key={key}>
                    <Table
                      dataSource={data(unidade).filter(item => item[plano])}
                      columns={columnUniquePlan(plano)}
                      id="table-planos"
                      pagination={false}
                      rowKey="key"
                    />
                  </div>
                ) : null
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light py-5" style={{ touchAction: 'pan-y' }}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5 mb-5" style={{ touchAction: 'pan-y' }}>
              <CarouselFotos fotos={unidade.fotos.data} />
            </div>
            <div className="col-md-6">
              <h2>Unidade {unidade.titulo}</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>{unidade.descricao}</p>
              <Link href="#table" className="btn btn-primary btn-lg text-white">
                Quero Promoção
              </Link>
            </div>
          </div>
        </div>
      </div>
      {unidade.prime && <SectionPrime />}
      {unidade.natacao && <SectionNatacao href={unidade.natacao_link} />}
      {unidade.video && (
        <div className=" prime-section text-bg-dark">
          <div className="container h-100">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${utils.getYoutubeVideoID(unidade.video)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-5">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?q=${unidade.endereco}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                width="90%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-md-6">
              <h6 className="text-uppercase">VENHA CONHECER A UNIDADE {unidade.titulo}</h6>
              <h2 className="py-2 fw-bold">Faça uma visita a unidade {unidade.titulo} e garanta sua matricula!</h2>
              <div className="py-2">
                <p>
                  <b>Telefone: </b>(31) 4141-1962
                </p>
                <p>
                  <b>Endereço: </b>
                  {unidade.endereco}
                </p>
                <p>
                  <b>Segunda a Sexta: </b>
                  {unidade.horario_segunda_sexta}
                </p>
                <p>
                  <b>Sabado: </b>
                  {unidade.horario_sabado}
                </p>
                {unidade.horario_domingo && (
                  <p>
                    <b>Domingos e Feriados: </b>
                    {unidade.horario_domingo}
                  </p>
                )}
              </div>
              <Link href="#table" className="btn btn-primary btn-lg text-white">
                Fazer Matricula
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
