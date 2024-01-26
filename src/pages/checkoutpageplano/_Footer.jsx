import { Space } from 'antd'
import { LockOutlined } from '@ant-design/icons'

export default function Footer() {
  return (
    <div className="w-100 text-center">
      <Space size="large">
        <div className="text-start">
          <b>Cartões de crédito</b>
          <div className="cards">
            <img src="/icons/visa.svg" width="33" alt="" />
            <img src="/icons/mastercard.svg" width="33" alt="" />
            <img src="/icons/american.svg" width="33" alt="" />
            <img src="/icons/hypercard.svg" width="33" alt="" />
            <img src="/icons/dinners.svg" width="33" alt="" />
            <img src="/icons/elo.svg" width="33" alt="" />
          </div>
        </div>
        <div className="secure">
          <Space className="py-2 float-end">
            <LockOutlined style={{ fontSize: 40 }} />
            <div className="text-start">
              AMBIENTE
              <br />
              100% SEGURO
            </div>
          </Space>
        </div>
      </Space>
    </div>
  )
}
