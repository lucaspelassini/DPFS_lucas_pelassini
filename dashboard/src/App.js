import React, { useState, useEffect } from 'react';
import './App.css';
import Panel from './components/Panel';
import LastUser from './components/LastUser';
import Categories from './components/Categories';
import ProductsList from './components/ProductsList';
import ProductForm from './components/ProductForm';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [lastUser, setLastUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

 const loadData = () => {
  fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => {
      setUsers(data.users);
      if (data.users.length > 0) {
        const lastUserId = Math.max(...data.users.map(u => u.id));
        return fetch(`http://localhost:3000/api/users/${lastUserId}`);
      }
    })
    .then(response => response?.json())
    .then(userData => {
      if (userData) setLastUser(userData);
    })
    .catch(error => console.error('Error:', error));

  fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
      setProducts(data.products);
      setCategories(data.countByCategory);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });

  fetch('http://localhost:3000/api/categories')
    .then(response => response.json())
    .then(data => {
      setAllCategories(data.categories);
    })
    .catch(error => console.error('Error:', error));
};

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = async (product) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${product.id}`);
      const fullProduct = await response.json();
      setEditingProduct(fullProduct);
      setShowForm(true);
    } catch (error) {
      console.error('Error al cargar producto:', error);
      alert('Error al cargar el producto');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Producto eliminado exitosamente');
          loadData(); 
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleSaveProduct = async (formData) => {
    try {
      const url = editingProduct 
        ? `http://localhost:3000/api/products/${editingProduct.id}`
        : 'http://localhost:3000/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(editingProduct ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
        setShowForm(false);
        setEditingProduct(null);
        loadData(); 
      } else {
        alert('Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el producto');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Cargando Dashboard...</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="dashboard-header">
        <h1>🌿 Dashboard - Botánica.com</h1>
      </header>

      <div className="dashboard-container">
        <div className="panels-grid">
          <Panel title="Total Usuarios" value={users.length} color="#6b9080" />
          <Panel title="Total Productos" value={products.length} color="#5a7a6a" />
          <Panel title="Total Categorías" value={Object.keys(categories).length} color="#8ba888" />
        </div>

        <div className="details-grid">
          <LastUser user={lastUser} />
          <Categories categories={categories} />
        </div>

        <div className="products-section">
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={handleCreateProduct}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6b9080',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ➕ Crear Nuevo Producto
            </button>
          </div>
          
          <ProductsList 
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={allCategories}
          onSave={handleSaveProduct}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

export default App;