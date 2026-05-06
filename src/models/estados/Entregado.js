import EstadoPedido from '../EstadoPedido';

// Estado cuando el pedido ha sido entregado
class Entregado extends EstadoPedido {
  // No permite avanzar el pedido
  avanzarEstado() {
    throw new Error('El pedido ya fue entregado');
  }

  // No permite cancelar el pedido
  cancelarPedido() {
    throw new Error('No se puede cancelar un pedido entregado');
  }

  // Retorna el nombre del estado
  getNombre() {
    return 'Entregado';
  }

  // Retorna la descripción del estado
  getDescripcion() {
    return '🎉 ¡Pedido entregado! Gracias por tu compra.';
  }

  // No permite cancelar
  puedeCancelar() {
    return false;
  }
}

export default Entregado;
