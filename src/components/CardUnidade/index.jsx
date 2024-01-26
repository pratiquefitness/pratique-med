import { Badge, Button, Card, Typography } from 'antd'
import { Distance, ImageCardCover } from './styled'

import { GrLocation } from 'react-icons/gr'
import { useRouter } from 'next/router'
import Preco from './Preco'

const { Title, Paragraph } = Typography

export default function CardUnidade({ slug, title, address, distance, image, price }) {
  const router = useRouter()

  return (
    <Card
      cover={
        <Preco price={price}>
          <ImageCardCover
            img={image ? image : 'https://place-hold.it/500x200'}
            onClick={() => router.push(`/unidades/${slug}${router.query?.type ? '&type=no-layout' : ''}`)}
          >
            {distance && (
              <Distance>
                <GrLocation size={18} className="mr-1" />
                {`${(distance / 1000).toFixed(0)}km`}
              </Distance>
            )}
          </ImageCardCover>
        </Preco>
      }
      hoverable
    >
      <Title level={4}>{title}</Title>
      <Paragraph>{address}</Paragraph>
      <Button
        type="primary"
        onClick={() => router.push(`/unidades/${slug}${router.query?.type ? '&type=no-layout' : ''}`)}
        block
      >
        Ver Planos
      </Button>
    </Card>
  )
}
