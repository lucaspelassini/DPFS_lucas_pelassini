import React from 'react';

function LastUser({ user }) {
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
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        },
        avatar: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#6b9080',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
        },
        details: {
            flex: 1
        },
        name: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '5px'
        },
        email: {
            color: '#666',
            fontSize: '14px'
        }
    };

    if (!user) {
        return <div style={styles.container}>Cargando...</div>;
    }

    const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;

    return (
        <div style={styles.container}>
            <div style={styles.title}>Último Usuario Registrado</div>
            <div style={styles.userInfo}>
                <div style={styles.avatar}>{initials}</div>
                <div style={styles.details}>
                    <div style={styles.name}>
                        {user.firstName} {user.lastName}
                    </div>
                    <div style={styles.email}>{user.email}</div>
                </div>
            </div>
        </div>
    );
}

export default LastUser;