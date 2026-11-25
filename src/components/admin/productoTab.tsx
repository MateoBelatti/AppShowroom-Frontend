import React, { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useProduct } from '../../hooks/useProduct.hook';
import { useCategorias } from '../../hooks/useCategorias.hook';
import type { ProductoCreateDto, ProductoDto, ProductoUpdateDto } from '../../types/producto.interface';
import { ProductForm } from './productForm';
import { ConfirmDialog } from '../ui/confirmDialog';
import { AdminEmpty, AdminError, AdminLoading, AdminToolbar } from '../ui/adminStates';

type Notify = (msg: string, type: 'ok' | 'error') => void;
const pesos = (valor: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor);

export const ProductosTab: React.FC<{ notify: Notify }> = ({ notify }) => {
    const [search, setSearch] = useState('');
    const [productToEdit, setProductToEdit] = useState<ProductoUpdateDto | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState<ProductoDto | null>(null);
    const { productos, loading, error, fetchProduct, deleteProduct, addProduct, updateProduct } = useProduct();
    const { categorias } = useCategorias();

    const filtrados = productos.filter(p => {
        const texto = `${p.nombre} ${p.descripcion ?? ''} ${p.categorias.map(c => c.nombre).join(' ')}`.toLowerCase();
        return texto.includes(search.trim().toLowerCase());
    });

    const handlerOpenCreate = () => {
        setIsFormVisible(true);
        setProductToEdit(null);
    };

    const handlerOpenEdit = (producto: ProductoDto) => {
        setProductToEdit({
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion ?? '',
            precio: producto.precio,
            imagen: producto.imagen,
            stock: producto.stock,
            activo: producto.activo,
            tipo: producto.tipo,
            categoriasId: producto.categorias.map(c => c.id),
        });
        setIsFormVisible(true);
    };

    const handlerDelete = async () => {
        if (!productoAEliminar) return;
        try {
            await deleteProduct(productoAEliminar.id);
            notify(`Se eliminó "${productoAEliminar.nombre}".`, 'ok');
        } catch {
            notify('No se pudo eliminar el producto.', 'error');
        } finally {
            setProductoAEliminar(null);
        }
    };

    const handleSubmit = async (data: ProductoUpdateDto | ProductoCreateDto) => {
        try {
            if (productToEdit) {
                await updateProduct(data as ProductoUpdateDto);
                notify('El producto fue actualizado.', 'ok');
            } else {
                await addProduct(data as ProductoCreateDto);
                notify('El producto fue creado.', 'ok');
            }
            setIsFormVisible(false);
            setProductToEdit(null);
        } catch {
            notify('No se pudo guardar el producto. Revisá los datos e intentá de nuevo.', 'error');
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setProductToEdit(null);
    };

    return (
        <div className="fade-in">
            {isFormVisible ? (
                <ProductForm
                    initialData={productToEdit}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    availableCategories={categorias}
                    notify={notify}
                />
            ) : (
                <>
                    <AdminToolbar
                        search={search}
                        onSearch={setSearch}
                        placeholder="Buscar por nombre, descripción o categoría..."
                        actionLabel="Nuevo producto"
                        onAction={handlerOpenCreate}
                        actionIcon={Plus}
                    />

                    {loading && <AdminLoading rows={6} label="Cargando productos..." />}
                    {!loading && error && <AdminError message={error} onRetry={fetchProduct} />}
                    {!loading && !error && filtrados.length === 0 && (
                        <AdminEmpty
                            title={productos.length === 0 ? 'Todavía no hay productos' : 'Sin resultados'}
                            description={productos.length === 0
                                ? 'Cargá el primer producto para empezar a mostrar el catálogo.'
                                : `No encontramos productos para "${search}".`}
                            actionLabel={productos.length === 0 ? 'Crear producto' : undefined}
                            onAction={productos.length === 0 ? handlerOpenCreate : undefined}
                        />
                    )}
                    {!loading && !error && filtrados.length > 0 && (
                        <div className="admin-card">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle admin-table mb-0">
                                    <thead>
                                        <tr>
                                            <th className="ps-4">Producto</th>
                                            <th>Categorías</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
                                            <th>Estado</th>
                                            <th className="pe-4 text-end">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtrados.map(p => (
                                            <tr key={p.id}>
                                                <td className="ps-4">
                                                    <div className="d-flex align-items-center gap-3">
                                                        {p.imagen ? (
                                                            <img src={p.imagen} alt="" className="table-img-thumb" />
                                                        ) : (
                                                            <span className="admin-no-image" aria-hidden="true">—</span>
                                                        )}
                                                        <div className="min-w-0">
                                                            <div className="fw-semibold text-truncate">{p.nombre}</div>
                                                            <small className="text-secondary d-block text-truncate">
                                                                {p.descripcion || 'Sin descripción'}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex flex-wrap gap-1">
                                                        {p.categorias.length > 0
                                                            ? p.categorias.map(c => <span className="admin-tag" key={c.id}>{c.nombre}</span>)
                                                            : <span className="text-secondary small">Sin categoría</span>}
                                                    </div>
                                                </td>
                                                <td className="fw-semibold">{pesos(p.precio)}</td>
                                                <td>
                                                    <span className={p.stock <= 5 ? 'admin-stock-low' : ''}>{p.stock}</span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${p.activo ? 'bg-success-subtle text-success-emphasis' : 'bg-secondary-subtle text-secondary-emphasis'}`}>
                                                        {p.activo ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="pe-4 text-end">
                                                    <div className="admin-actions">
                                                        <button type="button" className="admin-action admin-action--edit" onClick={() => handlerOpenEdit(p)} aria-label={`Editar ${p.nombre}`} title="Editar">
                                                            <Pencil size={15} />
                                                        </button>
                                                        <button type="button" className="admin-action admin-action--delete" onClick={() => setProductoAEliminar(p)} aria-label={`Eliminar ${p.nombre}`} title="Eliminar">
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="admin-card__footer">Mostrando {filtrados.length} de {productos.length} productos</div>
                        </div>
                    )}
                </>
            )}

            {productoAEliminar && (
                <ConfirmDialog
                    title="Eliminar producto"
                    msg={`¿Eliminar "${productoAEliminar.nombre}"? Esta acción no se puede deshacer.`}
                    onConfirm={handlerDelete}
                    onCancel={() => setProductoAEliminar(null)}
                />
            )}
        </div>
    );
};
