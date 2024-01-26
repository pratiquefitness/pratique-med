import { Badge } from 'antd'

export default function Preco({ children, price }) {
  return (
    <Badge.Ribbon
      text={price ? `a partir de R$ ${price}` : 'Sob Consulta'}
      color="green"
      style={{
        padding: 8,
        paddingLeft: 10,
        fontSize: 14,
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
      }}
    >
      {children}
    </Badge.Ribbon>
  )
}
