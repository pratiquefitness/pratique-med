import { Spin } from 'antd'

export default function Loading(props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...props?.style
      }}
    >
      <Spin />
    </div>
  )
}
