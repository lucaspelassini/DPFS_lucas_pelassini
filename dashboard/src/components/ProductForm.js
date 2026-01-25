import React, { useState, useEffect } from 'react';

function ProductForm({ product, categories, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        stock: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                categoryId: product.category?.id || '',
                stock: product.stock || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        modal: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        label: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '5px'
        },
        input: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            width: '100%'
        },
        textarea: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            width: '100%',
            minHeight: '80px',
            resize: 'vertical'
        },
        select: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            width: '100%'
        },
        buttons: {
            display: 'flex',
            gap: '10px',
            marginTop: '20px'
        },
        btnSave: {
            flex: 1,
            padding: '12px',
            backgroundColor: '#6b9080',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
        btnCancel: {
            flex: 1,
            padding: '12px',
            backgroundColor: '#ccc',
            color: '#333',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.overlay} onClick={onCancel}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 style={styles.title}>
                    {product ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label style={styles.label}>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div>
                        <label style={styles.label}>Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={styles.textarea}
                            required
                        />
                    </div>

                    <div>
                        <label style={styles.label}>Precio</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            style={styles.input}
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label style={styles.label}>Categoría</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            style={styles.select}
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={styles.label}>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.buttons}>
                        <button type="submit" style={styles.btnSave}>
                            {product ? 'Actualizar' : 'Crear'}
                        </button>
                        <button type="button" onClick={onCancel} style={styles.btnCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;