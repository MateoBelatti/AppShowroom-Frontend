import { ShoppingBag, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { type ProductoDto } from "../../types/producto.interface";
import { useCarrito } from "../../hooks/useCarrito.hook";

import "./productCard.css";
import { useAuth } from "../../hooks/useAuth.hook";

export function ProductCard({ id, nombre, descripcion, precio, imagen, stock, activo, tipo, categorias }: ProductoDto) {
    const carrito = useCarrito();
    const [cantidad, setCantidad] = useState<number>(1);
    const auth = useAuth();

    const handleIncrement = () => {
        if (cantidad < stock) setCantidad(cantidad + 1);
    };

    const handleDecrement = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
    };

    const handleAddCarrito = () => {
        if (cantidad > stock || cantidad < 1 || stock === 0) return;

        try {
            if (auth.user?.id == undefined) return;
            console.log("Creando detalle");
            
            carrito.addDetalle({
                usuarioId : Number(auth.user?.id),
                carritoId: Number(carrito.carrito?.id),
                productoId: id,
                cantidad: cantidad,
            });
            setCantidad(1);
            console.log("Detalle creado");
            carrito.refreshDetalles();
        } catch (error) {
            console.error("Error al añadir producto al carrito", error);
        }
    };

    const badgeCategoria = categorias?.[0]?.nombre ?? null;

    return (
        <article className="product-card card h-100">

            {/* Imagen */}
            <div className="card-img-wrapper position-relative">
                <img
                    src={imagen}
                    alt={nombre}
                    className="card-img-top"
                />
                {stock === 0 && (
                    <span className="badge-agotado">Agotado</span>
                )}
            </div>

            {/* Contenido */}
            <div className="card-body d-flex flex-column">

                {badgeCategoria && (
                    <span className="product-category-badge">{badgeCategoria}</span>
                )}

                <h3 className="product-name">{nombre}</h3>

                {descripcion && (
                    <p className="product-description">{descripcion}</p>
                )}

                {/* precio + controles */}
                <div className="product-footer mt-auto">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="product-price">${precio.toString()}</span>
                        <span className="stock-label">
                            {stock > 0 ? `${stock} disponibles` : "Sin stock"}
                        </span>
                    </div>

                    {stock > 0 ? (
                        <div className="d-flex flex-wrap align-items-center gap-2">

                            <div className="quantity-selector">
                                <button
                                    className="btn-qty"
                                    onClick={handleDecrement}
                                    disabled={cantidad <= 1}
                                    aria-label="Reducir cantidad"
                                >
                                    <Minus size={13} />
                                </button>
                                <span className="qty-display">{cantidad}</span>
                                <button
                                    className="btn-qty"
                                    onClick={handleIncrement}
                                    disabled={cantidad >= stock}
                                    aria-label="Aumentar cantidad"
                                >
                                    <Plus size={13} />
                                </button>
                            </div>

                            <button
                                className="btn-card-accent flex-grow-1"
                                onClick={handleAddCarrito}
                            >
                                <ShoppingBag size={14} />
                                Añadir
                            </button>

                        </div>
                    ) : (
                        <button className="btn btn-secondary btn-sm w-100 opacity-50" disabled>
                            No disponible
                        </button>
                    )}

                </div>
            </div>
        </article>
    );
}