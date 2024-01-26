import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import Link from 'next/link'

const renderCheckOrNot = value =>
  typeof value === 'boolean' ? (
    value ? (
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    ) : (
      <CloseCircleTwoTone twoToneColor="#ed143d" />
    )
  ) : (
    value
  )

export const planos = ['plano_fit', 'plano_plus', 'plano_combo_plus', 'plano_prime', 'plano_combo_prime']

export const getValueOfPlan = plan => {
  return plan ? plan.split('#')[0] : plan
}

export const getCodeOfPlan = plan => {
  return plan ? plan.split('#')[1] : plan
}

export const data = unidade => {
  return [
    // {
    //   title: 'ACOMPANHAMENTO COM NUTRICIONISTA ESPORTIVO',
    //   plano_fit: false,
    //   plano_plus: false,
    //   plano_combo_plus: true,
    //   plano_prime: false,
    //   plano_combo_prime: true
    // },
    {
      title: 'METODOLOGIA EXCLUSIVA POWERGYM',
      plano_fit: false,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    {
      title: 'ACESSO TOTAL A  HAPPY ZONE (AULAS COLETIVAS)',
      plano_fit: true,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    // {
    //   title: 'ACESSO ILIMITADO A MAIS DE 80 ACADEMIAS',
    //   plano_fit: false,
    //   plano_plus: false,
    //   plano_combo_plus: false,
    //   plano_prime: true,
    //   plano_combo_prime: true
    // },
    {
      title: 'ACESSO A ILIMITADO A MAIS DE 70 ACADEMIAS - EXCETO PRIMES',
      plano_fit: false,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    {
      title: 'NO MULTA - SEM MULTA DE CANCELAMENTO',
      plano_fit: true,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    {
      title: 'AJUSTE DE TREINO A QUALQUER MOMENTO',
      plano_fit: false,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    {
      title: 'PRATIQUE EM CASA  - APLICATIVO DE CUIDADO 24H',
      plano_fit: true,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    {
      title: 'ESPAÇO POWER CYCLE - AULAS DE SPINNING FULL TIME',
      plano_fit: true,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    {
      title: '01 EXAME DE BIOIMPEDANCIA MENSAL',
      plano_fit: false,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    {
      title: 'TREINO E ATENDIMENTO SUPERIOR',
      plano_fit: false,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    {
      title: 'AMIGO DE TREINO - LEVE ATÉ 1 AMIGO DIFERENTE TODO SÁBADO',
      plano_fit: true,
      plano_plus: true,
      plano_combo_plus: true,
      plano_prime: true,
      plano_combo_prime: true
    },
    // {
    //   title: 'ESPAÇO PRIME - ESPAÇO EXCLUSIVO DE TREINAMENTO',
    //   plano_fit: false,
    //   plano_plus: false,
    //   plano_combo_plus: false,
    //   plano_prime: true,
    //   plano_combo_prime: true
    // },
    {
      title: '',
      plano_fit: <h4>R$ {getValueOfPlan(unidade?.plano_fit)}</h4>,
      plano_plus: <h4>R$ {getValueOfPlan(unidade?.plano_plus)}</h4>,
      plano_combo_plus: <h4>R$ {getValueOfPlan(unidade?.plano_combo_plus)}</h4>,
      plano_prime: <h4>R$ {getValueOfPlan(unidade?.plano_prime)}</h4>,
      plano_combo_prime: <h4>R$ {getValueOfPlan(unidade?.plano_combo_prime)}</h4>
    },
    {
      title: '',
      plano_fit: (
        <Link
          href={`/checkoutpageplano/${unidade.slug}?selected=plano_fit`}
          className="btn btn-primary text-white btn-lg plano_fit"
        >
          Matricular
        </Link>
      ),
      plano_plus: (
        <Link
          href={`/checkoutpageplano/${unidade.slug}?selected=plano_plus`}
          className="btn btn-primary text-white btn-lg plano_plus"
        >
          Matricular
        </Link>
      ),
      plano_combo_plus: (
        <Link
          href={`/checkoutpageplano/${unidade.slug}?selected=plano_combo_plus`}
          className="btn btn-primary text-white btn-lg plano_combo_plus"
        >
          Matricular
        </Link>
      ),
      plano_prime: (
        <Link
          href={`/checkoutpageplano/${unidade.slug}?selected=plano_prime`}
          className="btn btn-primary text-white btn-lg plano_prime"
        >
          Matricular
        </Link>
      ),
      plano_combo_prime: (
        <Link
          href={`/checkoutpageplano/${unidade.slug}?selected=plano_combo_prime`}
          className="btn btn-primary text-white btn-lg plano_combo_prime"
        >
          Matricular
        </Link>
      )
    }
  ]
}

const plano_fit = {
  title: <img src="/planos/fit.png" alt="Plano fit" width="180" />,
  dataIndex: 'plano_fit',
  key: 'plano_fit',
  align: 'center',
  render: renderCheckOrNot
}

const plano_plus = {
  title: <img src="/planos/plus.png" alt="Plano plus" width="180" />,
  dataIndex: 'plano_plus',
  key: 'plano_plus',
  align: 'center',
  render: renderCheckOrNot
}

const plano_combo_plus = {
  title: <img src="/planos/combo_plus.png" alt="Plano combo" width="180" />,
  dataIndex: 'plano_combo_plus',
  key: 'plano_combo_plus',
  align: 'center',
  render: renderCheckOrNot
}

const plano_prime = {
  title: <img src="/planos/prime.png" alt="Plano prime" width="180" />,
  dataIndex: 'plano_prime',
  key: 'plano_prime',
  align: 'center',
  render: renderCheckOrNot
}

const plano_combo_prime = {
  title: <img src="/planos/combo_prime.png" alt="Plano prime" width="180" />,
  dataIndex: 'plano_combo_prime',
  key: 'plano_combo_prime',
  align: 'center',
  render: renderCheckOrNot
}

export const columns = unidade => {
  return [
    {
      title: '',
      dataIndex: 'title',
      key: 'title'
    },
    // unidade?.plano_combo_prime ? plano_combo_prime : {},
    // unidade?.plano_prime ? plano_prime : {},
    // unidade?.plano_combo_plus ? plano_combo_plus : {},
    unidade?.plano_plus ? plano_plus : {}
    // unidade?.plano_fit ? plano_fit : {}
  ]
}

export const columnUniquePlan = plan => {
  const columns = {
    plano_combo_prime: plano_combo_prime,
    plano_prime: plano_prime,
    plano_combo_plus: plano_combo_plus,
    plano_plus: plano_plus,
    plano_fit: plano_fit
  }
  return [
    {
      ...columns[plan],
      render: (value, record) => {
        if (typeof value === 'boolean') {
          return value ? (
            <>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              {' ' + record.title}
            </>
          ) : (
            ''
          )
        } else return value
      }
    }
  ]
}

export const PlanosNomes = {
  customPlan: 'Plano Customizado',
  plano_fit: 'Plano Fit',
  plano_plus: 'Plano Plus',
  plano_combo_plus: 'Plano Combo da Saúde',
  plano_prime: 'Plano Prime',
  plano_combo_prime: 'Plano Combo Prime'
}
