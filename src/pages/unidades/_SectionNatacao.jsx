import Link from 'next/link'

export default function SectionNatacao({ href }) {
  return (
    <div className="container py-5 natacao-section">
      <div className="p-5 text-bg-dark h-100 bg-info rounded-3">
        <div className="row">
          <div className="col-md-8">
            <p className="decorator">BENEFÍCIOS EXCLUSIVOS</p>
            <h1>
              Esta unidade conta com <span>CT aquático</span>
            </h1>
            <p>
              Exercícios dentro da água são um verdadeiro sucesso, pois são mais fáceis de praticar, não exigem tanto do
              organismo e ainda possibilita que públicos de todas as idades possam fazer. Essa unidade, conta com
              piscina e todo o leque de modalidades que só a Pratique oferece.
            </p>
            <Link href={href || '#'} className="btn btn-dark">
              Quero Agendar
            </Link>
          </div>
          <div className="col-md-4 text-end">
            <img src="/ct-aquatico.png" height={220} className="px-5" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
