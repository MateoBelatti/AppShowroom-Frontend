import React, { useState } from 'react';
import { FolderOpen, Pencil, Plus, Trash2 } from 'lucide-react';
import { useCategorias } from '../../hooks/useCategorias.hook';
import type { CategoriaCreateDto, CategoriaDto, CategoriaUpdateDto } from '../../types/categoria.interfaces';
import { CategoryForm } from './categoriasForm';
import { ConfirmDialog } from '../ui/confirmDialog';
import { AdminEmpty, AdminError, AdminLoading, AdminToolbar } from '../ui/adminStates';

type Notify = (msg: string, type: 'ok' | 'error') => void;

export const CategoriasTab: React.FC<{ notify: Notify }> = ({ notify }) => {
    const [search, setSearch] = useState('');
    const [categoriaToEdit, setCategoriaToEdit] = useState<CategoriaUpdateDto | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [categoriaAEliminar, setCategoriaAEliminar] = useState<CategoriaDto | null>(null);
    const { categorias, loadingCat, errorCat, cargarCategorias, addCategoria, updateCategoria, deleteCategoria } = useCategorias();

    const catFiltradas = categorias.filter(c => c.nombre.toLowerCase().includes(search.trim().toLowerCase()));

    const handlerOpenEdit = (categoria: CategoriaDto) => {
        setCategoriaToEdit({ id: categoria.id, nombre: categoria.nombre });
        setIsFormVisible(true);
    };

    const handlerOpenCreate = () => {
        setCategoriaToEdit(null);
        setIsFormVisible(true);
    };

    const handlerSubmit = async (data: CategoriaUpdateDto | CategoriaCreateDto) => {
        try {
            if (categoriaToEdit) {
                await updateCategoria(data as CategoriaUpdateDto);
                notify('La categoría fue actualizada.', 'ok');
            } else {
                await addCategoria(data as CategoriaCreateDto);
                notify('La categoría fue creada.', 'ok');
            }
            setIsFormVisible(false);
            setCategoriaToEdit(null);
        } catch {
            notify('No se pudo guardar la categoría.', 'error');
        }
    };

    const handlerCancel = () => {
        setIsFormVisible(false);
        setCategoriaToEdit(null);
    };

    const handlerDelete = async () => {
        if (!categoriaAEliminar) return;
        try {
            await deleteCategoria(categoriaAEliminar.id);
            notify(`Se eliminó "${categoriaAEliminar.nombre}".`, 'ok');
        } catch {
            notify('No se pudo eliminar la categoría.', 'error');
        } finally {
            setCategoriaAEliminar(null);
        }
    };

    return (
        <div className="fade-in">
            {isFormVisible ? (
                <CategoryForm
                    initialData={categoriaToEdit}
                    onSubmit={handlerSubmit}
                    onCancel={handlerCancel}
                />
            ) : (
                <>
                    <AdminToolbar
                        search={search}
                        onSearch={setSearch}
                        placeholder="Buscar categorías..."
                        actionLabel="Nueva categoría"
                        onAction={handlerOpenCreate}
                        actionIcon={Plus}
                    />

                    {loadingCat && <AdminLoading rows={4} label="Cargando categorías..." />}
                    {!loadingCat && errorCat && <AdminError message={errorCat} onRetry={cargarCategorias} />}
                    {!loadingCat && !errorCat && catFiltradas.length === 0 && (
                        <AdminEmpty
                            icon={FolderOpen}
                            title={categorias.length === 0 ? 'Todavía no hay categorías' : 'Sin resultados'}
                            description={categorias.length === 0
                                ? 'Creá la primera categoría para organizar el catálogo.'
                                : `No encontramos categorías para "${search}".`}
                            actionLabel={categorias.length === 0 ? 'Crear categoría' : undefined}
                            onAction={categorias.length === 0 ? handlerOpenCreate : undefined}
                        />
                    )}
                    {!loadingCat && !errorCat && catFiltradas.length > 0 && (
                        <>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
                                {catFiltradas.map(c => (
                                    <div className="col" key={c.id}>
                                        <div className="admin-category-card h-100">
                                            <span className="admin-category-card__icon"><FolderOpen size={22} /></span>
                                            <h5 className="admin-category-card__title">{c.nombre}</h5>
                                            <p className="admin-category-card__meta">ID {c.id}</p>
                                            <div className="d-flex justify-content-center gap-2 mt-auto">
                                                <button type="button" className="admin-action admin-action--edit" onClick={() => handlerOpenEdit(c)} aria-label={`Editar ${c.nombre}`} title="Editar">
                                                    <Pencil size={15} />
                                                </button>
                                                <button type="button" className="admin-action admin-action--delete" onClick={() => setCategoriaAEliminar(c)} aria-label={`Eliminar ${c.nombre}`} title="Eliminar">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-secondary small mt-3 mb-0">Mostrando {catFiltradas.length} de {categorias.length} categorías</p>
                        </>
                    )}
                </>
            )}

            {categoriaAEliminar && (
                <ConfirmDialog
                    title="Eliminar categoría"
                    msg={`¿Eliminar "${categoriaAEliminar.nombre}"? Esta acción no se puede deshacer.`}
                    onConfirm={handlerDelete}
                    onCancel={() => setCategoriaAEliminar(null)}
                />
            )}
        </div>
    );
};
