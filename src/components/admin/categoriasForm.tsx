import React, { useState, useEffect } from 'react';
import './categoriasForm.css';
import type { CategoriaCreateDto, CategoriaUpdateDto } from '../../types/categoria.interfaces';

interface CategoryFormProps {
    initialData?: CategoriaUpdateDto | null;
    onSubmit: (data: CategoriaCreateDto | CategoriaUpdateDto) => void;
    onCancel: () => void;
}

const defaultFormState: CategoriaCreateDto | CategoriaUpdateDto= {
    nombre: ''
};

export const CategoryForm: React.FC<CategoryFormProps> = ({ 
    initialData, 
    onSubmit, 
    onCancel 
}) => {
    const [formData, setFormData] = useState<CategoriaCreateDto | CategoriaUpdateDto>(defaultFormState);
    const isEditMode = !!initialData;

    useEffect(() => {
        if (initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(initialData);
        } else {
            setFormData(defaultFormState);
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onCancel();
    };

    return (
        <div className="card shadow-sm category-form-card">s
            <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                <h4 className="mb-0">{isEditMode ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h4>
            </div>
            
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="form-label fw-bold">Nombre de la Categoría</label>
                        <input 
                            type="text" 
                            className="form-control category-input" 
                            id="nombre" 
                            name="nombre" 
                            value={formData.nombre} 
                            onChange={handleInputChange} 
                            required 
                            autoFocus 
                            placeholder="Ej. Electrónica, Ropa, etc."
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2 border-top pt-3">
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary px-4 category-form-btn" 
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary px-4 category-form-btn"
                        >
                            {isEditMode ? 'Guardar Cambios' : 'Crear Categoría'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};