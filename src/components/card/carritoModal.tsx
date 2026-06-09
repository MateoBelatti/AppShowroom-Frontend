import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useCarrito } from "../../hooks/useCarrito.hook";
import "./carritoModal.css";
import { useProduct } from "../../hooks/useProduct.hook";

interface CarritoModalProps {
    onClose: () => void;
}

const CarritoModal: React.FC<CarritoModalProps> = ({ onClose }) => {
    const { detalles, removeDetalle, updateDetalle } = useCarrito();
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const { productos } = useProduct();

    // Bloquear scroll del body mientras el modal está abierto
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    // Cerrar con tecla Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleRemove = async (idDetalle: number) => {
        setLoadingId(idDetalle);
        try {
            await removeDetalle(idDetalle);
        } finally {
            setLoadingId(null);
        }
    };

    const handleUpdateCantidad = async (idDetalle: number, nuevaCantidad: number) => {
        if (nuevaCantidad < 1) return;
        setLoadingId(idDetalle);
        try {
            await updateDetalle({ id: idDetalle, cantidad : nuevaCantidad });
        } finally {
            setLoadingId(null);
        }
    };

    const permitirAumentar = (cantidad : number, productoId : number) : boolean =>{
        const producto = productos.find(prod=> prod.id == productoId);
        if (producto) {
            return cantidad + 1 <= producto.stock;
        }
        return false;
    }

    const seleccionarImagen = ( idProducto : number) : string =>{
        const imagen = productos.find( prod => prod.id == idProducto);
        if (imagen) return imagen.imagen;
        return "";
    }

    const total = detalles.reduce((acc, d) => acc + d.subtotal, 0);

    const formatPrecio = (precio: number) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
        }).format(precio);

    return (
        <div className="carrito-overlay" onClick={onClose}>
            <div className="carrito-drawer" onClick={(e) => e.stopPropagation()}>

                {/* HEADER */}
                <div className="carrito-header">
                    <div className="carrito-header-left">
                        <CiShoppingCart size={22} color="var(--text-h)" />
                        <h2>Mi Carrito</h2>
                        {detalles.length > 0 && (
                            <span className="carrito-badge-count">{detalles.length}</span>
                        )}
                    </div>
                    {/* boton de cerrar carrito */}
                    <button className="carrito-close-btn" onClick={onClose} aria-label="Cerrar carrito">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* CONTENIDO */}
                {detalles.length === 0 ? (
                    <div className="carrito-empty">
                        <CiShoppingCart size={72} color="var(--text-secondary)" />
                        <p>Tu carrito está vacío</p>
                        <p className="carrito-empty-hint">Explorá nuestros productos y agregá tus favoritos</p>
                    </div>
                ) : (
                    <div className="carrito-items">
                        {detalles.map((item) => (
                            <div
                                key={item.id}
                                className={`carrito-item ${loadingId === item.id ? "carrito-item-loading" : ""}`}
                            >
                                <img
                                    src={seleccionarImagen(item.productoId)}
                                    alt={item.nombreProducto}
                                    className="carrito-item-img"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/72x72/fde8ed/d48b9f?text=🌸";
                                    }}
                                />

                                <div className="carrito-item-info">
                                    <span className="carrito-item-name">{item.nombreProducto}</span>
                                    <span className="carrito-item-price">
                                        {formatPrecio(item.precioUnitario)} c/u
                                    </span>
                                    <div className="carrito-item-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => handleUpdateCantidad(item.id, item.cantidad - 1)}
                                            disabled={item.cantidad <= 1 || loadingId === item.id}
                                            aria-label="Disminuir cantidad"
                                        >
                                            −
                                        </button>
                                        <span className="qty-value">{item.cantidad}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => handleUpdateCantidad(item.id, item.cantidad + 1)}
                                            disabled={ !permitirAumentar(item.cantidad, item.productoId) || loadingId === item.id}
                                            aria-label="Aumentar cantidad"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="carrito-item-right">
                                    <span className="carrito-item-subtotal">
                                        {formatPrecio(item.subtotal)}
                                    </span>
                                    <button
                                        className="carrito-item-remove"
                                        onClick={() => handleRemove(item.id)}
                                        disabled={loadingId === item.id}
                                        aria-label="Eliminar producto"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* FOOTER */}
                <div className="carrito-footer">
                    {detalles.length > 0 && (
                        <>
                            <div className="carrito-footer-row">
                                <span className="carrito-footer-label">
                                    {detalles.length} {detalles.length === 1 ? "producto" : "productos"}
                                </span>
                                <span className="carrito-footer-subtotal">{formatPrecio(total)}</span>
                            </div>
                            <hr className="carrito-divider" />
                            <div className="carrito-footer-row">
                                <span className="carrito-total-label">Total</span>
                                <span className="carrito-total-amount">{formatPrecio(total)}</span>
                            </div>
                            <button className="btn-checkout">
                                Finalizar compra
                            </button>
                        </>
                    )}
                    <button className="btn-seguir-comprando" onClick={onClose}>
                        {detalles.length === 0 ? "Explorar productos" : "Seguir comprando"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CarritoModal;