import EstadoPedido from '../EstadoPedido';
import EnCamino from './EnCamino';

// Estado cuando se ha asignado un repartidor al pedido
class RepartidorAsignado extends EstadoPedido {
  // Avanza al estado de en camino
  avanzarEstado() {
    this.pedido.setEstado(new EnCamino(this.pedido));
  }

  // No permite cancelar el pedido en este estado
  cancelarPedido() {
    throw new Error('No se puede cancelar el pedido en este estado');
  }

  // Retorna el nombre del estado
  getNombre() {
    return 'Repartidor Asignado';
  }

  // Retorna la descripción del estado para mostrar al usuario
  getDescripcion() {
    return '🛵 Un repartidor ha sido asignado para tu pedido';
  }

  // No permite cancelar el pedido en este estado
  puedeCancelar() {
    return false;
  }
}

export default RepartidorAsignado;
