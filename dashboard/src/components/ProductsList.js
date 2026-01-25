import React from 'react';

function ProductsList({ products, onEdit, onDelete }) {
    const styles = {
        container: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#333'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            textAlign: 'left',
            padding: '12px',
            borderBottom: '2px solid #6b9080',
            color: '#333',
            fontWeight: 'bold'
        },
        td: {
            padding: '12px',
            borderBottom: '1px solid #eee',
            color: '#666'
        },
        btnEdit: {
            padding: '6px 12px',
            backgroundColor: '#6b9080',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '5px',
            fontSize: '14px'
        },
        btnDelete: {
            padding: '6px 12px',
            backgroundColor: '#d9534f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
        }
    };

    if (!products || products.length === 0) {
        return <div style={styles.container}>Cargando productos...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.title}>Listado de Productos</div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Categoría</th>
                        <th style={styles.th}>Descripción</th>
                        <th style={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td style={styles.td}>{product.id}</td>
                            <td style={styles.td}>{product.name}</td>
                            <td style={styles.td}>{product.category}</td>
                            <td style={styles.td}>
                                {product.description?.substring(0, 50)}...
                            </td>
                            <td style={styles.td}>
                                <button 
                                    style={styles.btnEdit}
                                    onClick={() => onEdit(product)}
                                >
                                    ✏️ Editar
                                </button>
                                <button 
                                    style={styles.btnDelete}
                                    onClick={() => onDelete(product.id)}
                                >
                                    🗑️ Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsList;