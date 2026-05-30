import React, { useState, useEffect } from 'react';
import './productForm.css'; // Tu archivo CSS personalizado
import type { ProductoCreateDto, ProductoUpdateDto } from '../../types/producto.interface';

interface ProductFormProps {
    initialData?: ProductoUpdateDto | null;
    onSubmit: (data: ProductoCreateDto | ProductoUpdateDto) => void;
    onCancel: () => void;
    // Opcional: Lista de categorías disponibles para el select múltiple
    availableCategories?: { id: number; nombre: string }[]; 
}

const defaultFormState: ProductoCreateDto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    activo: true,
    tipo: 1, // Valor por defecto
    stock: 0,
    imagen: '',
    categoriasId: []
};

export const ProductForm: React.FC<ProductFormProps> = ({ 
    initialData, 
    onSubmit, 
    onCancel,
    availableCategories = [] // Por defecto vacío si no se pasan
}) => {
    const [formData, setFormData] = useState<ProductoCreateDto | ProductoUpdateDto>(defaultFormState);
    const isEditMode = !!initialData;

    // Sincronizar el estado si cambia la data inicial (útil para modales)
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(defaultFormState);
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        let parsedValue: any = value;

        // Manejo de tipos específicos
        if (type === 'checkbox') {
            parsedValue = (e.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            parsedValue = value === '' ? 0 : Number(value);
        }

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
        setFormData(prev => ({
            ...prev,
            categoriasId: selectedOptions
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="card product-form-card shadow-sm">
            <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                <h4 className="mb-0">{isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="imagen" className="form-label fw-bold">URL de la Imagen</label>
                            <input type="text" className="form-control" id="imagen" name="imagen" value={formData.imagen} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label fw-bold">Descripción</label>
                        <textarea className="form-control" id="descripcion" name="descripcion" rows={3} value={formData.descripcion} onChange={handleInputChange} required />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="precio" className="form-label fw-bold">Precio ($)</label>
                            <input type="number" className="form-control" id="precio" name="precio" min="0" step="0.01" value={formData.precio} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="stock" className="form-label fw-bold">Stock</label>
                            <input type="number" className="form-control" id="stock" name="stock" min="0" value={formData.stock} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="tipo" className="form-label fw-bold">Tipo</label>
                            <input type="number" className="form-control" id="tipo" name="tipo" value={formData.tipo} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label htmlFor="categoriasId" className="form-label fw-bold">Categorías (Múltiple)</label>
                            <select multiple className="form-select" id="categoriasId" name="categoriasId" value={formData.categoriasId.map(String)} onChange={handleCategoryChange} size={3}>
                                {availableCategories.length > 0 ? (
                                    availableCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                    ))
                                ) : (
                                    <option disabled>No hay categorías disponibles</option>
                                )}
                            </select>
                            <small className="text-muted">Mantén presionado Ctrl (o Cmd) para seleccionar varias.</small>
                        </div>
                        
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="form-check form-switch ms-2 mt-4">
                                <input className="form-check-input" type="checkbox" role="switch" id="activo" name="activo" checked={formData.activo} onChange={handleInputChange} />
                                <label className="form-check-label fw-bold" htmlFor="activo">
                                    {formData.activo ? 'Producto Activo' : 'Producto Inactivo'}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 border-top pt-3">
                        <button type="button" className="btn btn-outline-secondary px-4" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary px-4">
                            {isEditMode ? 'Guardar Cambios' : 'Crear Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};