import React, { useState } from 'react';
import { useProduct } from '../../hooks/useProduct.hook';
import type { ProductoCreateDto, ProductoDto, ProductoUpdateDto } from '../../types/producto.interface';
import { ProductForm } from './productForm';
import { useCategorias } from '../../hooks/useCategorias.hook';

export const ProductosTab: React.FC<{ notify: (msg: string, type: 'ok'|'error') => void }> = ({ notify }) => {
    const [search, setSearch] = useState('');
    const [ productToEdit, setProductToEdit ] = useState< ProductoUpdateDto |  null>(null);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const { productos, deleteProduct, addProduct, updateProduct } = useProduct();
    const { categorias } = useCategorias();



    const handlerOpenCreate = () =>{
        setIsFormVisible(true);
        setProductToEdit(null);
    }

    const handlerOpenEdit = (producto : ProductoDto) =>{
        
        const productoUpdate : ProductoUpdateDto = {
            id : producto.id,
            nombre : producto.nombre,
            descripcion : producto.descripcion,
            precio : producto.precio,
            imagen : producto.imagen,
            stock : producto.stock,
            activo : producto.activo,
            tipo : producto.tipo,
            categoriasId : producto.categorias
        }
        setIsFormVisible(true);
        setProductToEdit(productoUpdate)
    }

    const handlerDelete = (idProduct : number) => {
        deleteProduct(idProduct);
    }
    function handleSubmit(data: ProductoUpdateDto | ProductoCreateDto): void {
        if (productToEdit){
            updateProduct(data as ProductoUpdateDto);
        }else{
            addProduct(data as ProductoCreateDto);
        }
        setIsFormVisible(false);
        setProductToEdit(null);
    }

    function handleCancel(): void {
        setIsFormVisible(false);
        setProductToEdit(null);
    }

    return (
        <div>
            { isFormVisible ? (
                <ProductForm 
                    initialData={productToEdit}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    availableCategories = {categorias}
                />
            ) : (
                <><div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
                        <input
                            type="text"
                            className="form-control w-auto flex-grow-1"
                            placeholder="Buscar productos..."
                            style={{ maxWidth: '400px' }}
                            value={search} onChange={e => setSearch(e.target.value)} />
                        <button className="btn btn-primary" onClick={handlerOpenCreate}>+ Nuevo Producto</button>
                    </div><div className="card shadow-sm border-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light text-uppercase" style={{ fontSize: '0.85rem' }}>
                                        <tr>
                                            <th className="ps-4">Nombre</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
                                            <th>Estado</th>
                                            <th className="pe-4 text-end">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productos.map(p => (
                                            <tr key={p.id}>
                                                <td className="ps-4 fw-bold">{p.nombre}</td>
                                                <td>${p.precio.toLocaleString()}</td>
                                                <td>{p.stock}</td>
                                                <td>
                                                    <span className={`badge ${p.activo ? 'bg-success' : 'bg-danger'}`}>
                                                        {p.activo ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="pe-4 text-end">
                                                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => { handlerOpenEdit(p); } }>✏️</button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => { handlerDelete(p.id); } }>🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div></>
            )}
            
        </div>
    );
};