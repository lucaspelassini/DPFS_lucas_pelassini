import React from 'react';

function Panel({ title, value, color }) {
    const styles = {
        panel: {
            backgroundColor: color || '#6b9080',
            color: 'white',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            minWidth: '200px'
        },
        title: {
            fontSize: '16px',
            marginBottom: '10px',
            opacity: 0.9
        },
        value: {
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '0'
        }
    };

    return (
        <div style={styles.panel}>
            <div style={styles.title}>{title}</div>
            <div style={styles.value}>{value}</div>
        </div>
    );
}

export default Panel;