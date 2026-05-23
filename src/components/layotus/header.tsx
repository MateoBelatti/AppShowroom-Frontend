import React, { useState } from "react";
import "./header.css";
import { CiShoppingCart, CiUser } from "react-icons/ci"; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.hook";
import { useCarrito } from "../../hooks/useCarrito.hook";
import AuthModal from "../login/authModal";

const Header: React.FC = () => {
    const [openBurbuja, setOpenBurbuja] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const auth = useAuth();
    const carrito = useCarrito();
    const navigate = useNavigate();

    const handleOpenPerfil = () => {
        if (auth.user?.rol === 'Admin') {
            navigate("/admin");
        } else {
            navigate("/perfil");
        }
        setOpenBurbuja(false);
    };

    const handleButton = () => {
        console.log(auth.user?.nombre);
        if (auth.user?.nombre) {
            setOpenBurbuja(!openBurbuja);
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const closeMobileMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className="header">
                <div className="container">

                    {/* Botón Hamburguesa (Solo visible en móvil) */}
                    <button 
                        className="mobile-menu-btn" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Abrir menú"
                    >
                        {isMenuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>

                    {/* Logo */}
                    <div className="logo">
                        <h1 className="m-0">CANELA ARTESANIAS</h1>
                    </div>

                    {/* Navegación */}
                    <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
                        <ul className="nav-list">
                            <li><Link to="/" onClick={closeMobileMenu}>INICIO</Link></li>
                            <li><Link to="/producto" onClick={closeMobileMenu}>PRODUCTOS</Link></li>
                            <li><Link to="/contacto" onClick={closeMobileMenu}>CONTACTO</Link></li>
                        </ul>
                    </nav>

                    {/* Iconos derecha */}
                    <div className="icons-container">
                        
                        {/* Usuario */}
                        <div className="user-wrapper">
                            <button onClick={handleButton} className="icon-button">
                                <CiUser color="#8f7889be" size={24} />
                            </button>

                            {auth.user?.nombre && openBurbuja && (
                                <>
                                    <div className="overlay" onClick={handleButton}></div>
                                    <div className="user-bubble">
                                        <p className="user-name">Hola, {auth.user.nombre}</p>
                                        <button className="perfil-btn" onClick={handleOpenPerfil}>
                                            Ir a mi perfil
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Carrito */}
                        {auth.user?.nombre && carrito && auth.user?.rol !== "Admin" && (
                            <Link to="/carrito" className="cart-wrapper">
                                <CiShoppingCart size={28} color="#8f7889be" />
                                {carrito.detalles.length > 0 &&(
                                    <span className="cart-badge">
                                        {carrito.detalles.length}
                                    </span>
                                )}
                            </Link>
                        )}
                    </div>

                </div>
            </header>

            {/* Modal de Login */}
            {isLoginModalOpen && (
                <AuthModal onClose={() => setIsLoginModalOpen(false)} />
            )}
        </>
    );
};

export default Header;