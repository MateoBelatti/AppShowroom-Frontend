import React, { useEffect, useState } from "react";
import { X, ShoppingBag, Minus, Plus, Check } from "lucide-react";
import type { ProductoDto } from "../../types/producto.interface";
import { useCarrito } from "../../hooks/useCarrito.hook";
import { useAuth } from "../../hooks/useAuth.hook";
import "./productDetailModal.css";

interface ProductDetailModalProps {
  product: ProductoDto | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const [cantidad, setCantidad] = useState<number>(1);
  const [agregado, setAgregado] = useState<boolean>(false);

  const carrito = useCarrito();
  const auth = useAuth();

  // Manejo de tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Bloqueo de scroll de la página mientras el modal está abierto
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product) return null;

  const handleIncrement = () => {
    if (cantidad < product.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAddCarrito = () => {
    if (product.stock <= 0 || cantidad < 1 || cantidad > product.stock) return;
    if (auth.user?.id === undefined) return;

    try {
      carrito.addDetalle({
        carritoId: Number(carrito.carrito?.id),
        productoId: product.id,
        cantidad: cantidad,
      });
      carrito.refreshDetalles();
      setAgregado(true);
      setTimeout(() => setAgregado(false), 1400);
    } catch (error) {
      console.error("Error al añadir producto al carrito", error);
    }
  };

  return (
    <div
      className="product-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="product-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          className="product-modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="product-modal-body">
          {/* Columna izquierda: Imagen */}
          <div className="product-modal-image-col">
            <img
              src={
                product.imagen ||
                "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
              }
              alt={product.nombre}
              className="product-modal-img"
            />
            {product.stock === 0 && (
              <span className="product-modal-badge-agotado">Agotado</span>
            )}
          </div>

          {/* Columna derecha: Detalles */}
          <div className="product-modal-details-col">
            {/* Categorías */}
            {product.categorias && product.categorias.length > 0 && (
              <div className="product-modal-categories">
                {product.categorias.map((cat) => (
                  <span key={cat.id ?? cat.nombre} className="product-modal-cat-tag">
                    {cat.nombre}
                  </span>
                ))}
              </div>
            )}

            <h2 id="product-modal-title" className="product-modal-title">
              {product.nombre}
            </h2>

            <div className="product-modal-price-stock-row">
              <span className="product-modal-price">
                ${product.precio.toLocaleString("es-AR")}
              </span>
              <span
                className={`product-modal-stock-badge ${
                  product.stock > 0 ? "in-stock" : "out-of-stock"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} disponibles`
                  : "Sin stock disponible"}
              </span>
            </div>

            <hr className="product-modal-divider" />

            {/* Descripción completa */}
            <div className="product-modal-description-wrapper">
              <h4 className="product-modal-section-label">Descripción</h4>
              <p className="product-modal-description">
                {product.descripcion ||
                  "Pieza artesanal elaborada a mano con cera natural y fragancias exclusivas para armonizar tus espacios."}
              </p>
            </div>

            {/* Acciones de compra */}
            <div className="product-modal-actions mt-auto">
              {product.stock > 0 ? (
                <div className="product-modal-purchase-controls">
                  <div className="product-modal-qty-selector">
                    <button
                      type="button"
                      className="btn-modal-qty"
                      onClick={handleDecrement}
                      disabled={cantidad <= 1}
                      aria-label="Disminuir cantidad"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="modal-qty-number">{cantidad}</span>
                    <button
                      type="button"
                      className="btn-modal-qty"
                      onClick={handleIncrement}
                      disabled={cantidad >= product.stock}
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`btn-modal-add ${agregado ? "added" : ""}`}
                    onClick={handleAddCarrito}
                    disabled={agregado}
                  >
                    {agregado ? (
                      <>
                        <Check size={16} />
                        ¡Añadido!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        Añadir al carrito
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn-modal-add disabled w-100"
                  disabled
                >
                  Producto no disponible
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
