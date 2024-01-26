import { useRouter } from 'next/router'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  const router = useRouter()
  const { type } = router.query
  return (
    <>
      {type !== 'no-layout' && <Header />}
      {children}
      {type !== 'no-layout' && <Footer />}
    </>
  )
}
