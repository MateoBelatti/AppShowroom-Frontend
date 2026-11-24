import React, { useMemo, useState } from "react";
import { ProductRowCard } from "../components/card/productRowCard";
import { ProductDetailModal } from "../components/card/productDetailModal";
import { useProduct } from "../hooks/useProduct.hook";
import { useCategorias } from "../hooks/useCategorias.hook";
import { useCarrito } from "../hooks/useCarrito.hook";
import { useAuth } from "../hooks/useAuth.hook";
import type { ProductoDto } from "../types/producto.interface";
import "./productPage.css";

const ProductPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [heroAgregado, setHeroAgregado] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductoDto | null>(null);

  const { productos, loading, error } = useProduct();
  const { categorias } = useCategorias();
  const carrito = useCarrito();
  const auth = useAuth();

  // Producto destacado: buscamos kits/regalos o el primer producto disponible con imagen
  const productoDestacado: ProductoDto | undefined = useMemo(() => {
    if (!productos || productos.length === 0) return undefined;
    const kit = productos.find((p) =>
      p.categorias.some(
        (c) =>
          c.nombre.toLowerCase().includes("kit") ||
          c.nombre.toLowerCase().includes("regalo")
      )
    );
    return kit || productos[0];
  }, [productos]);

  // Filtrado por categoría
  const productosFiltrados = useMemo(() => {
    if (!productos) return [];
    if (activeCategory === 0) return productos;
    return productos.filter((prod) =>
      prod.categorias.some((cat) => cat.id === activeCategory)
    );
  }, [productos, activeCategory]);

  // Handler para agregar el producto destacado al carrito
  const handleAddHeroProduct = () => {
    if (!productoDestacado || productoDestacado.stock <= 0) return;
    if (auth.user?.id === undefined) return;

    try {
      carrito.addDetalle({
        carritoId: Number(carrito.carrito?.id),
        productoId: productoDestacado.id,
        cantidad: 1,
      });
      carrito.refreshDetalles();
      setHeroAgregado(true);
      setTimeout(() => setHeroAgregado(false), 1400);
    } catch (err) {
      console.error("Error al añadir destacado al carrito", err);
    }
  };

  return (
    <div className="product-page-root">
      <div className="product-page-container">
        {/* =========================================
            1. HERO / BANNER DESTACADO (Inspirado en PDF)
            ========================================= */}
        {productoDestacado && (
          <section className="featured-hero-card">
            <div
              className="featured-hero-image-wrapper"
              onClick={() => setSelectedProduct(productoDestacado)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalles de ${productoDestacado.nombre}`}
              style={{ cursor: "pointer" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProduct(productoDestacado);
                }
              }}
            >
              <img
                src={
                  productoDestacado.imagen ||
                  "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80"
                }
                alt={productoDestacado.nombre}
                className="featured-hero-image"
              />
              {productoDestacado.stock === 0 && (
                <span className="featured-hero-badge-agotado">Agotado</span>
              )}
            </div>

            <div className="featured-hero-content">
              <span className="featured-hero-eyebrow">DESTACADO</span>
              <h2
                className="featured-hero-title"
                onClick={() => setSelectedProduct(productoDestacado)}
                style={{ cursor: "pointer" }}
              >
                {productoDestacado.nombre}
              </h2>
              {productoDestacado.descripcion && (
                <p className="featured-hero-description">
                  {productoDestacado.descripcion}
                </p>
              )}

              <div className="featured-hero-footer">
                <span className="featured-hero-price">
                  ${productoDestacado.precio.toLocaleString("es-AR")}
                </span>
                {productoDestacado.stock > 0 ? (
                  <button
                    type="button"
                    className={`btn-featured-add ${heroAgregado ? "added" : ""}`}
                    onClick={handleAddHeroProduct}
                    disabled={heroAgregado}
                  >
                    {heroAgregado ? "¡Añadido al carrito!" : "Añadir al carrito"}
                  </button>
                ) : (
                  <button type="button" className="btn-featured-add disabled" disabled>
                    Sin stock
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =========================================
            2. BARRA DE CATEGORÍAS (Horizontal Tabs)
            ========================================= */}
        <nav className="catalog-category-bar" aria-label="Categorías de productos">
          <button
            type="button"
            className={`catalog-category-tab ${activeCategory === 0 ? "active" : ""}`}
            onClick={() => setActiveCategory(0)}
          >
            Todos
          </button>
          {categorias?.map((cat) => (
            <button
              key={cat.id ?? cat.nombre}
              type="button"
              className={`catalog-category-tab ${
                activeCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat.id ?? 0)}
            >
              {cat.nombre}
            </button>
          ))}
        </nav>

        {/* =========================================
            3. LISTA DE PRODUCTOS (Horizontal Rows)
            ========================================= */}
        <main className="catalog-products-section">
          {loading && (
            <div className="catalog-feedback-box">
              <p>Cargando productos...</p>
            </div>
          )}

          {error && (
            <div className="catalog-feedback-box error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="catalog-products-list">
              {productosFiltrados.map((producto) => (
                <ProductRowCard
                  key={producto.id}
                  {...producto}
                  onOpenDetail={() => setSelectedProduct(producto)}
                />
              ))}
            </div>
          )}

          {!loading && !error && productosFiltrados.length === 0 && (
            <div className="catalog-feedback-box">
              <p>No hay productos disponibles en esta categoría.</p>
            </div>
          )}
        </main>
      </div>

      {/* =========================================
          4. MODAL DE DETALLE DE PRODUCTO
          ========================================= */}
      {selectedProduct && (
        <ProductDetailModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductPage;
