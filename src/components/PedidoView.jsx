import React, { useState, useEffect, useRef } from 'react';

function PedidoView({ 
  pedido, 
  onAvanzar, 
  onCancelar, 
  onAprobarPago,
  onReiniciar,
  historialEstados 
}) {
  const [contador, setContador] = useState(7);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervaloRef = useRef(null);
  const contadorRef = useRef(7);

  useEffect(() => {
    if (!pedido || !autoPlay || pedido.getEstadoNombre() === 'Entregado' || pedido.getEstadoNombre() === 'Cancelado') {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
      return;
    }

    intervaloRef.current = setInterval(() => {
      contadorRef.current -= 1;
      setContador(contadorRef.current);

      if (contadorRef.current <= 0) {
        // Aprobar pago automáticamente si es tarjeta y está pendiente
        if (pedido.metodoPago === 'tarjeta' && !pedido.pagoAprobado) {
          // Si el total es mayor a 5000, el pago falla
          if (pedido.total > 5000) {
            onCancelar?.();
          } else {
            onAprobarPago?.();
          }
        } else {
          // Avanzar estado automáticamente
          onAvanzar?.();
        }
        contadorRef.current = 7;
      }
    }, 1000);

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, [autoPlay, pedido, onAvanzar, onAprobarPago]);

  if (!pedido) {
    return (
      <div className="pedido-view">
        <p>No hay pedido activo. Crea uno desde el carrito.</p>
      </div>
    );
  }

  const puedeAvanzar = pedido.puedeAvanzar();
  const puedeCancelar = pedido.puedeCancelar();
  const estado = pedido.getEstadoNombre();
  const finalizado = estado === 'Entregado' || estado === 'Cancelado';

  return (
    <div className="pedido-view">
      <div className="estado-actual">
        <div className="estado-badge">{pedido.getEstadoNombre()}</div>
        <div className="estado-barra">
          <div className="barra-progreso" style={{ width: `${getProgreso(pedido.getEstadoNombre())}%` }}></div>
        </div>
        <p className="estado-descripcion">{pedido.getEstadoDescripcion()}</p>
        
      </div>

      <div className="pedido-info">
        <h3>Detalles del Pedido</h3>
        <div className="pedido-items">
          {pedido.items.map((item, index) => (
            <div key={index} className="pedido-item">
              <img src={item.imagen} alt={item.nombre} className="pedido-item-imagen" />
              <span>{item.nombre}</span>
              <strong>${item.precio.toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <p><strong>Total:</strong> ${pedido.total.toFixed(2)}</p>
        <p><strong>Método de pago:</strong> {pedido.metodoPago === 'tarjeta' ? '💳 Tarjeta' : '💵 Efectivo'}</p>
        {pedido.metodoPago === 'tarjeta' && (
          <p><strong>Pago:</strong> {pedido.pagoAprobado ? '✅ Aprobado' : '⏳ Pendiente (Se aprobará automáticamente)'}</p>
        )}
      </div>

      <div className="pedido-acciones">
        {!finalizado && (
          <>
            <button 
              className="btn-cancelar"
              onClick={onCancelar}
              disabled={!puedeCancelar}
            >
              ❌ Cancelar Pedido
            </button>
          </>
        )}
        {finalizado && (
          <button 
            className="btn-reiniciar"
            onClick={onReiniciar}
          >
            🔄 Reiniciar Pedido
          </button>
        )}
      </div>

      <div className="historial-estados">
        <h4>📜 Historial</h4>
        <div className="historial-lista">
          {historialEstados.map((estado, index) => (
            <span key={index} className="historial-item">{estado} {index < historialEstados.length - 1 && '→'}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function getProgreso(estadoNombre) {
  const estados = [
    'Pedido Creado',
    'Pedido Confirmado', 
    'Preparando Pedido',
    'Listo para Recoger',
    'Repartidor Asignado',
    'En Camino',
    'Entregado'
  ];
  const index = estados.indexOf(estadoNombre);
  if (index === -1) return 0;
  return ((index + 1) / estados.length) * 100;
}

export default PedidoView;
