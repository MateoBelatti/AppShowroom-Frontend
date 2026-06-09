import React, { useState } from 'react';
import CategoryFilter from '../components/card/categoriaFilter';
import { ProductCard } from '../components/card/productCard';
import './productPage.css';
import { useProduct } from '../hooks/useProduct.hook';
import { useCategorias } from '../hooks/useCategorias.hook';

const ProductPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const { productos } = useProduct();
    const { categorias } = useCategorias();

    const FiltrosActivados = 
        activeCategory === 0
        ? productos
        : productos?.filter((prod) => prod.categorias.some((cat) => cat.id === activeCategory));

    return (
    <> 
        <div className="store-banner">
            <img 
            src="https://res.cloudinary.com/diixxzm7s/image/upload/v1779455532/fondoStore_t5dxgm.png" 
            alt="Canela Artesanías Banner" 
            className="banner-image"
            />
        </div>

        <div className="page-container">
            <div className="store-layout">
            
            {/* BARRA LATERAL (Filtro) */}
            <aside className="store-sidebar">
                <CategoryFilter 
                categories={categorias ?? []} 
                selected={activeCategory} 
                onSelect={setActiveCategory} 
                />
            </aside>

            {/* CONTENIDO PRINCIPAL (Productos) */}
            <main className="store-main">
                <div className="product-grid">
                {FiltrosActivados?.map((producto) => (
                    <div key={producto.id} className="product-wrapper">
                    <ProductCard {...producto} />
                    </div>
                ))}
                </div>

                {FiltrosActivados?.length === 0 && (
                <div className="text-center py-5">
                    <p>No hay productos disponibles en esta categoría.</p>
                </div>
                )}
            </main>

            </div>
        </div>
        </>
    );
};

export default ProductPage;