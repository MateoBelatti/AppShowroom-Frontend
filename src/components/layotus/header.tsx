import React from "react";
import "./header.css"
import { CiShoppingCart, CiUser } from "react-icons/ci"; 
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.hook";
import { useCarrito } from "../../hooks/useCarrito.hook";


const Header: React.FC = () => {
    const [ openBurbuja, setOpenBurbuja ] = useState(false);

    const auth = useAuth();
    const carrito = useCarrito();
    const navigate = useNavigate();

    const handleOpenPerfil = ( ) => {
        if (auth.user?.rol === 'Admin') {
            navigate("/admin");
        } else {
            navigate("/perfil");
        }
        setOpenBurbuja(false);
    }
    const handleButton = () => {
        if (auth.user) {
            setOpenBurbuja(!openBurbuja);
            return
        } else {
            navigate("/login")
        }
    }


    return (
        <header className="header py-3">
            <div className="container d-flex flex-wrap align-items-center justify-content-between">

                {/* Logo */}
                <div className="logo">
                    <h1 className="m-0" >CANELA ARTESANIAS</h1>
                </div>

                {/* Navegación */}
                <nav className="main-nav">
                <ul className="nav-list">
                    <li><Link to="/">INICIO</Link></li>
                    <li><Link to="/producto">PRODUCTOS</Link></li>
                    <li><Link to="/contacto">CONTACTO</Link></li>
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

                                <button
                                className="perfil-btn"
                                onClick={handleOpenPerfil}
                                >
                                Ir a mi perfil
                                </button>
                            </div>
                            </>
                        )}
                    </div>

                    {/* Carrito */}
                    {auth.user?.nombre && carrito && auth.user?.rol !== "Admin" && (
                        <a href="/carrito" className="cart-wrapper">
                        <CiShoppingCart size={28} color="#8f7889be" />

                        {carrito.detalles.length > 0 &&(
                            <span className="cart-badge">
                            {carrito.detalles.length}
                            </span>
                        )}
                        </a>
                    )}

                </div>

            </div>
            </header>
    );
};

export default Header;