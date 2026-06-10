import React, { useState } from 'react';
import { useCategorias } from '../../hooks/useCategorias.hook';
import type { CategoriaCreateDto, CategoriaDto, CategoriaUpdateDto } from '../../types/categoria.interfaces';
import { CategoryForm } from './categoriasForm';
// Importa tus servicios, tipos y ConfirmDialog

export const CategoriasTab: React.FC<{ notify: (msg: string, type: 'ok'|'error') => void }> = () => {
    const [search, setSearch] = useState('');
    const [ categoriaToEdit, setCategoriaToEdit] = useState<CategoriaUpdateDto | null>(null);
    const [ isFormVisible, setIsFormVisible] = useState<boolean>(false);


    const { categorias, addCategoria, updateCategoria, deleteCategoria } = useCategorias();


    const catFiltradas = categorias.filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()));

    const handlerOpenEdit = ( categoria : CategoriaDto) =>{
        const categoriaUpdate : CategoriaUpdateDto = {
            id : categoria.id,
            nombre : categoria.nombre
        }
        setIsFormVisible(true);
        setCategoriaToEdit(categoriaUpdate);
    }

    function HandlerOpenCreate() {
        setCategoriaToEdit(null);
        setIsFormVisible(true);
    }
    function HandlerSubmit(data : CategoriaUpdateDto | CategoriaCreateDto) {
        if (categoriaToEdit) {
            updateCategoria(data as CategoriaUpdateDto)
        } else {
            addCategoria(data)
        }
    }
    function HandlerCancel() {
        setIsFormVisible(false);
        setCategoriaToEdit(null);
    }

    return (
        <div className="fade-in">
            { isFormVisible ? (
                <CategoryForm
                initialData={categoriaToEdit}
                onSubmit={HandlerSubmit}
                onCancel={HandlerCancel}
                />
            ) : (
                <>
                <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
                    <input 
                        type="text" 
                        className="form-control w-auto flex-grow-1" 
                        placeholder="Buscar categorías..." 
                        style={{ maxWidth: '400px' }}
                        value={search} onChange={e => setSearch(e.target.value)} 
                    />
                    <button className="btn btn-primary" onClick={HandlerOpenCreate}>+ Nueva Categoría</button>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
                    {catFiltradas.map(c => (
                        <div className="col" key={c.id}>
                            <div className="card h-100 shadow-sm border-0 text-center">
                                <div className="card-body p-4">
                                    <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                        <span className="fs-3 text-primary">📁</span>
                                    </div>
                                    <h5 className="card-title fw-bold">{c.nombre}</h5>
                                    <div className="mt-3 d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() =>{handlerOpenEdit(c)}}>Editar</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => {deleteCategoria(c.id)}}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                    </>
                )}
        </div>
    );
};


            