import { Link } from "react-router-dom"; // Importamos Link
import "./footer.css"; 

const Footer = () => {
    return (
        <footer className="footer pt-5 pb-4">
            <div className="container-fluid px-5">
                <div className="row justify-content-between g-0">
                    {/* Sección de Marca */}
                    <div className="col-md-4 mb-5 mb-md-0">
                        <h5 className="footer-brand mb-4">CANELA ARTESANIAS</h5>
                        <p className="footer-description">
                            Artesanías y objetos de decoración. Piezas únicas creadas con materiales excepcionales para espacios que inspiran.
                        </p>
                    </div>

                    {/* Sección de Navegación */}
                    <div className="col-md-2 mb-5 mb-md-0">
                        <h6 className="footer-section-title mb-4">NAVEGACIÓN</h6>
                        <ul className="list-unstyled footer-links">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/producto">Productos</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Sección de Contacto */}
                    <div className="col-md-3">
                        <h6 className="footer-section-title mb-4">CONTACTO</h6>
                        <ul className="list-unstyled footer-contact">
                            <li>hola@canelaartesanías.com</li>
                            <li>+54 291 123 4567</li> {/* Cambiado a formato local */}
                            <li>Bahía Blanca, Argentina</li>
                        </ul>
                    </div>
                </div>

                <hr className="footer-divider my-5" />

                <div className="footer-bottom text-center">
                    <p className="mb-0">
                        © 2026 Canela Artesanías. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;