import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct.hook";
import { ProductCard } from "../card/productCard";
import "./productosDestacadosSeccion.css";

// Máximo de productos a mostrar en la sección destacada de home
const MAX_FEATURED = 4;

export const ProductosDestacadosSeccion = () => {
    const { productos, loading, error } = useProduct();

    const productosDestacados = productos.slice(0, MAX_FEATURED);

    return (
        <section className="featured-products py-5">
            <div className="container">

                <header className="featured-header text-center mb-2">
                    <h2 className="featured-title">Productos Destacados</h2>
                    <p className="featured-subtitle mx-auto">
                        Piezas artesanales hechas con dedicación para tu hogar
                    </p>
                </header>

                {/* ESTADO CARGANDO Y ERROR DE PRODUCTOS*/}
                {loading && (
                    <div className="featured-loading">
                        <div className="loading-grid">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="skeleton-card" />
                            ))}
                        </div>
                    </div>
                )}

                {error && (
                    <p className="error-text text-center">{error}</p>
                )}

                {/* LISTA DE PRODUCTOS*/}
                {!loading && !error && productosDestacados.length > 0 && (
                    <>
                        <div className="row g-4">
                            {productosDestacados.map((product) => (
                                <div key={product.id} className="col-6 col-md-4 col-lg-3">
                                    <ProductCard {...product} />
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-5">
                            <Link
                                to="/producto"
                                className="btn-catalog d-inline-flex align-items-center gap-2"
                            >
                                Ver catálogo completo
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </>
                )}

                {/* Estado vacío */}
                {!loading && !error && productosDestacados.length === 0 && (
                    <p className="empty-text text-center">
                        Pronto habrá nuevos productos disponibles.
                    </p>
                )}

            </div>
        </section>
    );
};