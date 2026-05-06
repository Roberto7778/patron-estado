import React, { useState, useCallback } from 'react';
import Menu from './components/Menu';
import Carrito from './components/Carrito';
import PedidoView from './components/PedidoView';
import PagoSelector from './components/PagoSelector';
import Pedido from './models/Pedido';
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [pedidoActivo, setPedidoActivo] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);
  const [refreshPedido, setRefreshPedido] = useState(0);

  const totalCarrito = carrito.reduce((sum, item) => sum + (item.precio * (item.cantidad || 1)), 0);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      const nuevoCarrito = carrito.map(item => 
        item.id === producto.id 
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
      mostrarMensaje(`✅ ${producto.nombre} cantidad actualizada`);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      mostrarMensaje(`✅ ${producto.nombre} agregado al carrito`);
    }
  };

  const eliminarDelCarrito = (index) => {
    const item = carrito[index];
    if (item.cantidad > 1) {
      const nuevoCarrito = carrito.map((carritoItem, i) => 
        i === index 
          ? { ...carritoItem, cantidad: carritoItem.cantidad - 1 }
          : carritoItem
      );
      setCarrito(nuevoCarrito);
      mostrarMensaje(`🗑️ Una unidad de ${item.nombre} eliminada`);
    } else {
      const nuevoCarrito = carrito.filter((_, i) => i !== index);
      setCarrito(nuevoCarrito);
      mostrarMensaje(`🗑️ ${item.nombre} eliminado del carrito`);
    }
  };

  const crearPedido = () => {
    if (carrito.length === 0) {
      mostrarMensaje('⚠️ Agrega productos al carrito primero');
      return;
    }
    if (!metodoPagoSeleccionado) {
      mostrarMensaje('⚠️ Selecciona un método de pago');
      return;
    }

    const nuevoPedido = new Pedido([...carrito], totalCarrito);
    nuevoPedido.setMetodoPago(metodoPagoSeleccionado);
    setPedidoActivo(nuevoPedido);
    setCarrito([]);
    setMetodoPagoSeleccionado(null);
    mostrarMensaje('🎉 ¡Pedido creado exitosamente!');
  };

  const avanzarEstado = useCallback(() => {
    if (pedidoActivo) {
      const resultado = pedidoActivo.avanzarEstado();
      mostrarMensaje(resultado.message);
      if (resultado.success) {
        setRefreshPedido(prev => prev + 1);
      }
    }
  }, [pedidoActivo]);

  const cancelarPedido = useCallback(() => {
    if (pedidoActivo) {
      const resultado = pedidoActivo.cancelarPedido();
      mostrarMensaje(resultado.message);
      if (resultado.success) {
        setRefreshPedido(prev => prev + 1);
      }
    }
  }, [pedidoActivo]);

  const aprobarPagoTarjeta = useCallback(() => {
    if (pedidoActivo && pedidoActivo.metodoPago === 'tarjeta') {
      pedidoActivo.aprobarPagoTarjeta();
      setRefreshPedido(prev => prev + 1);
      mostrarMensaje('💳 Pago aprobado exitosamente');
    }
  }, [pedidoActivo]);

  const seleccionarMetodoPago = (metodo) => {
    setMetodoPagoSeleccionado(metodo);
    mostrarMensaje(`💳 Método de pago seleccionado: ${metodo === 'tarjeta' ? 'Tarjeta' : 'Efectivo'}`);
  };

  const reiniciarPedido = useCallback(() => {
    setPedidoActivo(null);
    setCarrito([]);
    setMetodoPagoSeleccionado(null);
    setRefreshPedido(0);
    mostrarMensaje('🔄 Pedido reiniciado. Puedes crear un nuevo pedido.');
  }, []);

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍕 Food Delivery App</h1>
        <p>Tu comida favorita en minutos</p>
      </header>

      {mensaje && <div className="mensaje-flotante">{mensaje}</div>}

      <div className="app-container">
        <div className="menu-section">
          <Menu onAgregarAlCarrito={agregarAlCarrito} />
          
          {!pedidoActivo && (
            <>
              <Carrito 
                items={carrito}
                onEliminarItem={eliminarDelCarrito}
                total={totalCarrito}
              />
              <PagoSelector 
                metodoPago={metodoPagoSeleccionado}
                onSeleccionarPago={seleccionarMetodoPago}
              />
              <button 
                className="btn-crear-pedido"
                onClick={crearPedido}
                disabled={carrito.length === 0 || !metodoPagoSeleccionado}
              >
                🛵 Crear Pedido
              </button>
            </>
          )}
        </div>

        <div className="pedido-section">
          {pedidoActivo && (
            <PedidoView 
              key={refreshPedido}
              pedido={pedidoActivo}
              onAvanzar={avanzarEstado}
              onCancelar={cancelarPedido}
              onAprobarPago={aprobarPagoTarjeta}
              onReiniciar={reiniciarPedido}
              historialEstados={pedidoActivo.historialEstados}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
