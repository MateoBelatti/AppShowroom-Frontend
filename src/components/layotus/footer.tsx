import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer-minimal">
            <div className="footer-container">
                
                {/* 1. MARCA Y LOGO */}
                <div className="footer-brand-section">
                    <img src="https://res.cloudinary.com/diixxzm7s/image/upload/v1779406115/logo_vi9qwc.png"
                        alt="Logo Canela Artesanias"
                        className="footer-logo" />
                    {/* <img src="TU_URL_AQUI" alt="Logo Canela Artesanías" className="footer-logo" /> 
                    */}
                    <h2 className="footer-brand-name">CANELA ARTESANÍAS</h2>
                </div>

                {/* 2. DESCRIPCIÓN CENTRAL */}
                <p className="footer-description-center">
                    Estamos comprometidos con el diseño y el bienestar. Ofrecemos las 
                    mejores artesanías y objetos de decoración elaborados a mano para tu hogar.
                </p>

                {/* 3. ENLACES LEGALES */}
                <div className="footer-links-inline">
                    <Link to="/terminos">Términos y condiciones</Link>
                    <span className="dot-separator">·</span>
                    <Link to="/privacidad">Política de privacidad</Link>
                </div>

                {/* 4. COPYRIGHT Y DESARROLLADOR */}
                <div className="footer-credits">
                    <p>© 2026 Canela Artesanías. Todos los derechos reservados.</p>
                    <p>Desarrollado por <span className="dev-name">Swer17</span></p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;