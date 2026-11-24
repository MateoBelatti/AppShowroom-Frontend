import React, { useState } from "react";
import { type ProductoDto } from "../../types/producto.interface";
import { useCarrito } from "../../hooks/useCarrito.hook";
import { useAuth } from "../../hooks/useAuth.hook";
import "./productRowCard.css";

interface ProductRowCardProps extends ProductoDto {
  onOpenDetail?: () => void;
}

export const ProductRowCard: React.FC<ProductRowCardProps> = ({
  id,
  nombre,
  descripcion,
  precio,
  imagen,
  stock,
  categorias,
  onOpenDetail,
}) => {
  const carrito = useCarrito();
  const auth = useAuth();
  const [agregado, setAgregado] = useState(false);

  const handleAddCarrito = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stock <= 0) return;
    if (auth.user?.id === undefined) return;

    try {
      carrito.addDetalle({
        carritoId: Number(carrito.carrito?.id),
        productoId: id,
        cantidad: 1,
      });
      carrito.refreshDetalles();
      setAgregado(true);
      setTimeout(() => setAgregado(false), 1400);
    } catch (error) {
      console.error("Error al añadir producto al carrito", error);
    }
  };

  const badgeCategoria = categorias?.[0]?.nombre ?? null;

  return (
    <article
      className="product-row-card"
      onClick={onOpenDetail}
      role={onOpenDetail ? "button" : undefined}
      tabIndex={onOpenDetail ? 0 : undefined}
      onKeyDown={(e) => {
        if (onOpenDetail && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onOpenDetail();
        }
      }}
    >
      {/* Miniatura de imagen */}
      <div className="product-row-image-container">
        <img
          src={imagen || "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80"}
          alt={nombre}
          className="product-row-image"
          loading="lazy"
        />
        {stock === 0 && <span className="product-row-badge-agotado">Agotado</span>}
      </div>

      {/* Info central */}
      <div className="product-row-info">
        {badgeCategoria && (
          <span className="product-row-category">{badgeCategoria}</span>
        )}
        <h3 className="product-row-title">{nombre}</h3>
        <p className="product-row-desc">
          {descripcion ? `${descripcion} · ` : ""}
          <span className="product-row-stock">
            {stock > 0 ? `${stock} disponibles` : "Sin stock"}
          </span>
        </p>
      </div>

      {/* Acciones derecha */}
      <div className="product-row-actions">
        <span className="product-row-price">
          ${precio.toLocaleString("es-AR")}
        </span>
        {stock > 0 ? (
          <button
            type="button"
            className={`btn-row-add ${agregado ? "added" : ""}`}
            onClick={handleAddCarrito}
            disabled={agregado}
          >
            {agregado ? "¡Añadido!" : "Añadir"}
          </button>
        ) : (
          <button
            type="button"
            className="btn-row-add disabled"
            disabled
            onClick={(e) => e.stopPropagation()}
          >
            Agotado
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductRowCard;
