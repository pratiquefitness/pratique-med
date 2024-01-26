import { Carousel } from 'antd'

const contentStyle = {
  margin: 0,
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79'
}

export default function CarouselFotos({ fotos }) {
  return fotos ? (
    <Carousel autoplaySpeed={2000} arrows draggable autoplay>
      {fotos.map((item, key) => {
        const foto = item.attributes
        return (
          <div key={key}>
            <div
              style={{
                height: 350,
                background: `url(${foto.url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              ts
            </div>
          </div>
        )
      })}
    </Carousel>
  ) : (
    <Carousel arrows>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  )
}
