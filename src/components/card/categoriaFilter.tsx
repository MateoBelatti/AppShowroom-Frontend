import React, { useState } from 'react';
import './categoriaFilter.css';
import type { CategoriaDto } from '../../types/categoria.interfaces';

interface Props {
  categories: CategoriaDto[];
  selected: number;
  onSelect: (cat: number) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (id: number) => {
    onSelect(id);
    setIsOpen(false); // Cierra el menú en móvil al elegir una opción
  };

  return (
    <div className="category-sidebar-container">
      {/* Cabecera clickeable solo en móvil */}
      <div className="category-header" onClick={toggleMenu}>
        <h3 className="category-title">CATEGORÍAS</h3>
        <span className="mobile-toggle-icon">
          {isOpen ? '✕' : '☰'}
        </span>
      </div>
      
      {/* Lista de categorías que reacciona al estado isOpen en móvil */}
      <div className={`category-list ${isOpen ? 'open' : ''}`}>
        <button
          className={`category-item ${selected === 0 ? 'active' : ''}`}
          onClick={() => handleSelect(0)}
        >
          Todos
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat.id || cat.nombre}
            className={`category-item ${selected === cat.id ? 'active' : ''}`}
            onClick={() => handleSelect(cat.id ?? 0)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;