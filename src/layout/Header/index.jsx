import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-3">
      <div className="container d-flex flex-wrap justify-content-center">
        <Link
          href="https://pratiquefitness.com.br/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img src="/logo2.png" alt="" />
        </Link>

        {/* <ul className="nav my-3">
          <li className="nav-item">
            <Link
              href="https://pratiquefitness.com.br/sobre-a-pratique/"
              className="nav-link active"
              aria-current="page"
            >
              Quem Somos
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/unidades" className="nav-link">
              Unidades
            </Link>
          </li>
          <li className="nav-item">
            <Link href="https://pratiquefitness.com.br/nutricionista-online/" className="nav-link">
              Pratique Nutri
            </Link>
          </li>
          <li className="nav-item">
            <Link href="https://pratiquefitness.com.br/blog/" className="nav-link">
              BLOG
            </Link>
          </li>
          <li className="nav-item">
            <Link href="https://pratiquefitness.com.br/parceiros-pratique-fitness/" className="nav-link">
              Parceiros
            </Link>
          </li>
          <li className="nav-item">
            <Link href="https://pratiquefitness.com.br/horarios/" className="nav-link">
              Hórarios
            </Link>
          </li>
          <li className="nav-item">
            <Link href="https://pratiquefitness.com.br/trabalhe-na-academia-pratique/" className="nav-link">
              Trabalhe Conosco
            </Link>
          </li>
        </ul> */}
      </div>
    </header>
  )
}
