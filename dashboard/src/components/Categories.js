import React from 'react';

function Categories({ categories }) {
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
        list: {
            listStyle: 'none',
            padding: 0,
            margin: 0
        },
        item: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: '1px solid #eee'
        },
        categoryName: {
            color: '#333',
            fontSize: '16px'
        },
        count: {
            backgroundColor: '#6b9080',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
        }
    };

    if (!categories) {
        return <div style={styles.container}>Cargando...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.title}>Productos por Categoría</div>
            <ul style={styles.list}>
                {Object.entries(categories).map(([name, count]) => (
                    <li key={name} style={styles.item}>
                        <span style={styles.categoryName}>{name}</span>
                        <span style={styles.count}>{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;