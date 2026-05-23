import "./aboutMe.css"

export function AboutMe() {
  return (
    <section className="about-me-section py-5">
      <div className="container py-md-5">
        <div className="row align-items-center">

          {/* Imagen a la izquierda */}
          <div className="col-md-6 mb-5 mb-md-0">
            <div className="profile-img-wrapper">
              <img
                src={"https://res.cloudinary.com/diixxzm7s/image/upload/v1779406116/heroImg_e7dc0c.jpg"}
                alt="Creación de artesanías Canela"
                className="profile-img"
              />
            </div>
          </div>

          {/* Contenido a la derecha */}
          <div className="col-md-6 ps-md-5">

            <span className="about-label">Nuestra historia</span>

            <h2 className="section-title mb-4">
              Trabajo hecho a mano,<br />
              con amor en cada detalle
            </h2>

            <p className="section-description mb-4">
              En Canela Artesanías creemos que cada pieza cuenta una historia.
              Creamos velas y objetos decorativos vertiendo dedicación en cada molde,
              buscando llevar calidez, luz y aromas únicos a los rincones de tu hogar.
            </p>

            <p className="section-description mb-5">
              Desde nuestras primeras ferias hasta tu mesa, cada producto es
              cuidadosamente elaborado a mano, priorizando materiales nobles
              y una estética cálida que transforma cualquier espacio.
            </p>

            {/* Estadísticas */}
            <div className="row stats-container border-top border-secondary border-opacity-10">
              <div className="col-4">
                <h3 className="stat-number">100<sup>%</sup></h3>
                <p className="stat-label">Artesanal</p>
              </div>
              <div className="col-4 border-start border-secondary border-opacity-25">
                <h3 className="stat-number">50<sup>+</sup></h3>
                <p className="stat-label">Aromas únicos</p>
              </div>
              <div className="col-4 border-start border-secondary border-opacity-25">
                <h3 className="stat-number">∞</h3>
                <p className="stat-label">Dedicación</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
