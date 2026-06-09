import React, { useState, useEffect } from 'react';
import './productForm.css';
import type { ProductoCreateDto, ProductoUpdateDto } from '../../types/producto.interface';

interface ProductFormProps {
    initialData?: ProductoUpdateDto | null;
    onSubmit: (data: ProductoCreateDto | ProductoUpdateDto) => void;
    onCancel: () => void;
    availableCategories?: { id: number; nombre: string }[];
}

const defaultFormState: ProductoCreateDto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    activo: true,
    tipo: 1,
    stock: 0,
    imagen: '',
    categoriasId: []
};

    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/diixxzm7s/image/upload";
    const CLOUDINARY_UPLOAD_PRESET = "canela_react_products";

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    availableCategories = []
}) => {
    const [formData, setFormData] = useState<ProductoCreateDto | ProductoUpdateDto>(defaultFormState);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const isEditMode = !!initialData;


    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(defaultFormState);
        }
    }, [initialData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        let parsedValue: any = value;

        if (type === 'checkbox') {
            parsedValue = (e.target as HTMLInputElement).checked;
        }
        // ✅ FIX: no convertir a Number acá — dejar el string mientras escribe
        // Se convierte al hacer submit o se maneja como string en el input

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Guardar como string durante la edición para evitar el bug del "0" que no se borra
        setFormData(prev => ({
            ...prev,
            [name]: value === '' ? '' : Number(value)
        }));
    };

    const handleCategoryToggle = (categoryId: number) => {
        setFormData(prev => {
            const current = prev.categoriasId ?? [];
            const exists = current.includes(categoryId);
            return {
                ...prev,
                categoriasId: exists
                    ? current.filter(id => id !== categoryId)
                    : [...current, categoryId]
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Asegurarse de que los campos numéricos sean numbers al enviar
        const dataToSubmit = {
            ...formData,
            precio: Number(formData.precio) || 0,
            stock: Number(formData.stock) || 0,
            tipo: Number(formData.tipo) || 1,
        };
        onSubmit(dataToSubmit);
    };
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(CLOUDINARY_URL, {
                method: "POST",
                body: data,
            });

            const uploadedImage = await response.json();
            
            if (uploadedImage.secure_url) {
                // Actualizamos el form con la URL que nos devuelve Cloudinary
                setFormData(prev => ({
                    ...prev,
                    imagen: uploadedImage.secure_url
                }));
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            alert("Hubo un error al subir la imagen. Inténtalo de nuevo.");
        } finally {
            setIsUploading(false);
        }
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
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            {/* ✅ NUEVO INPUT: Cambiado a type="file" */}
                            <label htmlFor="imagen" className="form-label fw-bold">Imagen</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                id="imagen"
                                name="imagen"
                                onChange={handleImageUpload}
                                // Si el input está cargando, lo deshabilitamos para que no suban 2 a la vez
                                disabled={isUploading} 
                            />
                            
                            {/* Feedback visual para el usuario */}
                            {isUploading && (
                                <small className="text-primary mt-1 d-block">Subiendo imagen a Cloudinary...</small>
                            )}
                            
                            {/* Previsualización de la imagen si ya existe una URL */}
                            {formData.imagen && !isUploading && (
                                <div className="mt-2">
                                    <img 
                                        src={formData.imagen} 
                                        alt="Preview" 
                                        style={{ height: '60px', borderRadius: '4px', objectFit: 'cover' }} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label fw-bold">Descripción</label>
                        <textarea
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            rows={3}
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* ✅ FIX: usar handleNumberChange para evitar bugs con inputs numéricos */}
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="precio" className="form-label fw-bold">Precio ($)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="precio"
                                name="precio"
                                min="0"
                                step="0.01"
                                value={formData.precio}
                                onChange={handleNumberChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="stock" className="form-label fw-bold">Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                id="stock"
                                name="stock"
                                min="0"
                                value={formData.stock}
                                onChange={handleNumberChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="tipo" className="form-label fw-bold">Tipo</label>
                            <input
                                type="number"
                                className="form-control"
                                id="tipo"
                                name="tipo"
                                min="1"
                                value={formData.tipo}
                                onChange={handleNumberChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        {/* ✅ FIX: cuadro con scroll + checkboxes en lugar de select múltiple */}
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Categorías</label>
                            <div
                                style={{
                                    border: '1px solid #dee2e6',
                                    borderRadius: '6px',
                                    height: '140px',
                                    overflowY: 'auto',
                                    padding: '8px',
                                    backgroundColor: '#fff'
                                }}
                            >
                                {availableCategories.length > 0 ? (
                                    availableCategories.map(cat => (
                                        <div
                                            key={cat.id}
                                            className="form-check"
                                            style={{ padding: '4px 8px', borderRadius: '4px' }}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`cat-${cat.id}`}
                                                checked={(formData.categoriasId ?? []).includes(cat.id)}
                                                onChange={() => handleCategoryToggle(cat.id)}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`cat-${cat.id}`}
                                                style={{ cursor: 'pointer', userSelect: 'none' }}
                                            >
                                                {cat.nombre}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-muted small">No hay categorías disponibles</span>
                                )}
                            </div>
                            <small className="text-muted">
                                {(formData.categoriasId ?? []).length} seleccionada(s)
                            </small>
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <div className="form-check form-switch ms-2 mt-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="activo"
                                    name="activo"
                                    checked={formData.activo}
                                    onChange={handleInputChange}
                                />
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
                            {isUploading ? 'Subiendo imagen...' : (isEditMode ? 'Guardar Cambios' : 'Crear Producto')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};