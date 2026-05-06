import React from 'react';

function PagoSelector({ metodoPago, onSeleccionarPago }) {
  return (
    <div className="pago-selector">
      <h3>💳 Método de Pago</h3>
      <div className="pago-opciones">
        <label className="pago-opcion">
          <input
            type="radio"
            value="tarjeta"
            checked={metodoPago === 'tarjeta'}
            onChange={() => onSeleccionarPago('tarjeta')}
          />
          <span>💳 Tarjeta de Crédito/Débito</span>
        </label>
        <label className="pago-opcion">
          <input
            type="radio"
            value="efectivo"
            checked={metodoPago === 'efectivo'}
            onChange={() => onSeleccionarPago('efectivo')}
          />
          <span>💵 Efectivo contra entrega</span>
        </label>
      </div>
    </div>
  );
}

export default PagoSelector;
