import React from 'react';
import './categoriaFilter.css';
import type { CategoriaDto } from '../../types/categoria.interfaces';


interface Props {
  categories: CategoriaDto[];
  selected: number;
  onSelect: (cat: number) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onSelect }) => {
  return (
    <div className="category-sidebar-container">
      <h3 className="category-title">CATEGORÍAS</h3>
      
      <div className="category-list">
        <button
          className={`category-item ${selected === 0 ? 'active' : ''}`}
          onClick={() => onSelect(0)}
        >
          Todos
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat.id || cat.nombre}
            className={`category-item ${selected === cat.id ? 'active' : ''}`}
            onClick={() => onSelect(cat.id ?? 0)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;