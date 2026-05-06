import EstadoPedido from '../EstadoPedido';
import Entregado from './Entregado';

// Estado cuando el pedido está en camino al cliente
class EnCamino extends EstadoPedido {
  // Avanza al estado entregado
  avanzarEstado() {
    this.pedido.setEstado(new Entregado(this.pedido));
  }

  // No permite cancelar el pedido
  cancelarPedido() {
    throw new Error('No se puede cancelar el pedido en este estado');
  }

  // Retorna el nombre del estado
  getNombre() {
    return 'En Camino';
  }

  // Retorna la descripción del estado
  getDescripcion() {
    return '🚗 Tu pedido va en camino hacia tu dirección';
  }

  // No permite cancelar
  puedeCancelar() {
    return false;
  }
}

export default EnCamino;
