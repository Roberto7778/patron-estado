import React from 'react';

const productos = [
  {
    id: 1,
    nombre: 'Hamburguesa Clásica',
    precio: 180,
    imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    nombre: 'Pizza Pepperoni',
    precio: 160,
    imagen: 'https://www.saborusa.com/wp-content/uploads/2019/12/origen-de-la-pizza-1.jpg'
  },
  {
    id: 3,
    nombre: 'Tacos de Carne',
    precio: 150,
    imagen: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    nombre: 'Sushi Mix',
    precio: 250,
    imagen: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    nombre: 'Soda Refrescante',
    precio: 40,
    imagen: 'https://assets.clevelandclinic.org/transform/bdbee889-8499-43f1-a766-de93610e087d/Diet-Sodas-698051792-770x533-1_jpg'
  }
];

function Menu({ onAgregarAlCarrito }) {
  return (
    <div className="menu">
      <h2>🍽️ Menú</h2>
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <p className="precio">${producto.precio.toFixed(2)}</p>
            </div>
            <button 
              className="btn-agregar"
              onClick={() => onAgregarAlCarrito(producto)}
            >
              ➕ Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
