import React from 'react';

function Carrito({ items, onEliminarItem, total }) {
  if (items.length === 0) {
    return (
      <div className="carrito">
        <h2>🛒 Tu Carrito</h2>
        <p className="carrito-vacio">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="carrito">
      <h2>🛒 Tu Carrito</h2>
      <div className="carrito-items">
        {items.map((item, index) => (
          <div key={index} className="carrito-item">
            <div className="item-detalle">
              <span className="item-thumb">
                <img src={item.imagen} alt={item.nombre} />
              </span>
              <div className="item-info">
                <span className="item-nombre">{item.nombre}</span>
                <span className="item-cantidad">Cantidad: {item.cantidad || 1}</span>
              </div>
            </div>
            <div className="item-precio-container">
              <span className="item-precio">
                ${(item.precio * (item.cantidad || 1)).toFixed(2)}
              </span>
              <span className="item-precio-unitario">
                ${item.precio.toFixed(2)} c/u
              </span>
            </div>
            <button 
              className="btn-eliminar"
              onClick={() => onEliminarItem(index)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      <div className="carrito-total">
        <strong>Total:</strong> ${total.toFixed(2)}</div>
    </div>
  );
}

export default Carrito;
