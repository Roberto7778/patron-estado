import EstadoPedido from '../EstadoPedido';

// Estado cuando el pedido ha sido cancelado
class Cancelado extends EstadoPedido {
  // No permite avanzar el pedido
  avanzarEstado() {
    throw new Error('No se puede avanzar un pedido cancelado');
  }

  // No permite cancelar nuevamente
  cancelarPedido() {
    throw new Error('El pedido ya está cancelado');
  }

  // Retorna el nombre del estado
  getNombre() {
    return 'Cancelado';
  }

  // Retorna la descripción del estado
  getDescripcion() {
    return '❌ El pedido ha sido cancelado';
  }

  // No permite cancelar
  puedeCancelar() {
    return false;
  }
}

export default Cancelado;
