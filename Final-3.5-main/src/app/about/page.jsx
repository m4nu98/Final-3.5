/**
 * v0 by Vercel.
 * @see https://v0.dev/t/omExmiisrhl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-24 aboutmargeninferior">  
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Somos un equipo de desarrolladores y diseñadores apasionados que se dedican a crear aplicaciones web
            hermosas y funcionales. Nuestra misión es ayudar a empresas e individuos a lograr sus objetivos a través de
            soluciones tecnológicas innovadoras.
          </p>
          <p className="text-muted-foreground text-lg mb-6">
            En esta página web, ofrecemos una amplia variedad de servicios profesionales, incluyendo electricistas,
            plomeros, jardineros, pintores y más. Nuestro objetivo es ser tu solución integral para todas tus
            necesidades de mantenimiento y reparación del hogar.
          </p>
          <p className="text-muted-foreground text-lg mb-6">
            Creemos en el poder de la colaboración y la comunicación abierta. Trabajamos en estrecha colaboración con
            nuestros clientes para entender sus necesidades y entregar soluciones a medida que superan sus expectativas.
            Nuestro equipo está en constante aprendizaje y crecimiento, manteniéndose actualizado con las últimas
            tendencias y mejores prácticas de la industria.
          </p>
          <p className="text-muted-foreground text-lg mb-6">
            En el centro, somos una comunidad de solucionadores de problemas que se han comprometido a tener un impacto
            positivo. Estamos orgullosos del trabajo que hacemos y de las relaciones que construimos con nuestros
            clientes y socios.
          </p>
        </div>
        <div>
          <img
            src="/placeholder.svg"
            alt="Sobre Nosotros"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  )
}